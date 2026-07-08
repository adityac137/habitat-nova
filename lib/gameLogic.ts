import {
  CATEGORY_PRESETS,
  Category,
  Habit,
  IslandState,
  NovaPodVariant,
  StructureType,
} from "./types";

/* ---------------------------------- Dates --------------------------------- */

export function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function daysBetween(isoA: string, isoB: string): number {
  const a = new Date(isoA + "T00:00:00");
  const b = new Date(isoB + "T00:00:00");
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function isScheduledToday(habit: Habit, iso: string = todayISO()): boolean {
  if (habit.frequency === "daily") return true;
  const dow = new Date(iso + "T00:00:00").getDay();
  return habit.frequency.includes(dow);
}

/** Number of scheduled days missed strictly between lastCompletedDate and today. */
function scheduledDaysMissedSince(habit: Habit, today: string): number {
  if (!habit.lastCompletedDate) return 0;
  const gap = daysBetween(habit.lastCompletedDate, today);
  if (gap <= 0) return 0;
  if (habit.frequency === "daily") return Math.max(0, gap - 1);
  // count scheduled days strictly between last completed and today
  let missed = 0;
  for (let i = 1; i < gap; i++) {
    const d = new Date(habit.lastCompletedDate + "T00:00:00");
    d.setDate(d.getDate() + i);
    if (habit.frequency.includes(d.getDay())) missed++;
  }
  return missed;
}

/* ---------------------------------- Tiers ---------------------------------- */

export function tierFromStreak(streak: number): 1 | 2 | 3 | 4 | 5 {
  if (streak >= 30) return 5;
  if (streak >= 14) return 4;
  if (streak >= 7) return 3;
  if (streak >= 3) return 2;
  return 1;
}

export function decayLevelFromMissedDays(missedDays: number): 0 | 1 | 2 | 3 {
  if (missedDays >= 6) return 3;
  if (missedDays >= 3) return 2;
  if (missedDays >= 1) return 1;
  return 0;
}

/**
 * Recompute a habit's live decay/streak state based on the current date,
 * without mutating history. Call this whenever habits are read/rendered
 * so structures reflect missed days even if the app wasn't open.
 */
export function recomputeLiveState(habit: Habit, today: string = todayISO()): Habit {
  const missed = scheduledDaysMissedSince(habit, today);
  if (missed <= 0) return { ...habit, decayLevel: 0 };
  const decayLevel = decayLevelFromMissedDays(missed);
  // Decay overlays the structure rather than instantly shrinking it — tier is only
  // pulled back down once a structure has gone fully Dormant (6+ missed days).
  const tier = decayLevel >= 3 ? 1 : habit.tier;
  return {
    ...habit,
    currentStreak: 0,
    decayLevel,
    tier,
  };
}

/** Mark a habit complete for today. Handles streak, tier, decay, history. */
export function completeHabit(habit: Habit, today: string = todayISO()): Habit {
  if (habit.lastCompletedDate === today) return habit; // already tended today
  const live = recomputeLiveState(habit, today);
  const wasSameStreak =
    live.lastCompletedDate &&
    isConsecutiveScheduled(live, live.lastCompletedDate, today);

  const newStreak = wasSameStreak ? live.currentStreak + 1 : 1;
  const newBest = Math.max(live.bestStreak, newStreak);
  const history = [...live.completionHistory, today].slice(-30);

  return {
    ...live,
    currentStreak: newStreak,
    bestStreak: newBest,
    tier: tierFromStreak(newStreak),
    decayLevel: 0,
    lastCompletedDate: today,
    completionHistory: history,
  };
}

function isConsecutiveScheduled(habit: Habit, lastDate: string, today: string): boolean {
  // "consecutive" means no scheduled day was skipped between lastDate and today
  const missed = scheduledDaysMissedSince(habit, today);
  return missed === 0 && daysBetween(lastDate, today) >= 0;
}

export function alreadyTendedToday(habit: Habit, today: string = todayISO()): boolean {
  return habit.lastCompletedDate === today;
}

/* ------------------------------- Island Vitality ---------------------------- */

export function computeVitality(habits: Habit[], today: string = todayISO()): number {
  if (habits.length === 0) return 72; // calm neutral default for empty islands
  let total = 0;
  for (const h of habits) {
    const live = recomputeLiveState(h, today);
    // tier contributes 0-100, decay subtracts a penalty
    const tierScore = (live.tier / 5) * 100;
    const decayPenalty = live.decayLevel * 12;
    total += Math.max(0, Math.min(100, tierScore - decayPenalty));
  }
  return Math.round(total / habits.length);
}

export function vitalityMood(score: number): {
  label: string;
  description: string;
} {
  if (score >= 80) return { label: "Radiant", description: "Your island is glowing bright today." };
  if (score >= 60) return { label: "Sunny", description: "Most of your island is thriving." };
  if (score >= 40) return { label: "Misty", description: "A gentle haze — a few structures need tending." };
  if (score >= 20) return { label: "Overcast", description: "Your island is a little quiet right now." };
  return { label: "Dim", description: "Your island is resting. One check-in brings the light back." };
}

/* ------------------------------ Custom habit visuals ------------------------- */

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Deterministically map a habit name to a preset category via keyword match. */
export function matchCategoryFromName(name: string): Category {
  const lower = name.toLowerCase();
  for (const preset of CATEGORY_PRESETS) {
    if (preset.category === "custom") continue;
    if (preset.keywords.some((kw) => lower.includes(kw))) {
      return preset.category;
    }
  }
  return "custom";
}

export function structureForCategory(category: Category): StructureType {
  const preset = CATEGORY_PRESETS.find((p) => p.category === category);
  return preset ? preset.structureType : "nova_pod";
}

/** Hash a habit name into a pastel HSL color clamped to this app's palette range. */
export function pastelColorFromName(name: string): string {
  const hash = hashString(name);
  const hue = hash % 360;
  const saturation = 45 + (hash % 20); // 45-65%
  const lightness = 78 + (hash % 10); // 78-88%
  return hslToHex(hue, saturation, lightness);
}

export function novaPodVariantFromName(name: string): NovaPodVariant {
  const hash = hashString(name + "-variant");
  const variants: NovaPodVariant[] = ["dome", "crystal", "arch"];
  return variants[hash % variants.length];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/* -------------------------------- Recency dots ------------------------------- */

/** Returns the last N days as booleans (completed or not), oldest first. */
export function last14Days(habit: Habit, today: string = todayISO()): boolean[] {
  const set = new Set(habit.completionHistory);
  const days: boolean[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today + "T00:00:00");
    d.setDate(d.getDate() - i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    days.push(set.has(iso));
  }
  return days;
}
