import { Habit } from "./types";

function isoDaysAgo(n: number, base: Date = new Date()): string {
  const d = new Date(base);
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function consecutiveHistory(daysAgoStart: number, count: number, base: Date = new Date()): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(isoDaysAgo(daysAgoStart - i, base));
  }
  return out.slice(-30);
}

function weekdayHistory(daysBack: number, weekdays: number[], base: Date = new Date()): string[] {
  const out: string[] = [];
  for (let i = daysBack; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    if (weekdays.includes(d.getDay())) {
      out.push(isoDaysAgo(i, base));
    }
  }
  return out.slice(-30);
}

/** Builds the demo island so it never feels empty on first launch. */
export function generateSeedHabits(base: Date = new Date()): Habit[] {
  const today = isoDaysAgo(0, base);

  return [
    {
      id: "h1",
      name: "Morning Gym Session",
      category: "fitness",
      structureType: "fitness_tower",
      accentColor: "#A8E6CF",
      frequency: "daily",
      currentStreak: 47,
      bestStreak: 47,
      tier: 5,
      decayLevel: 0,
      lastCompletedDate: today,
      completionHistory: consecutiveHistory(29, 30, base),
      createdAt: isoDaysAgo(47, base),
    },
    {
      id: "h2",
      name: "Read 20 Pages",
      category: "reading",
      structureType: "athenaeum_dome",
      accentColor: "#FFD9C0",
      frequency: "daily",
      currentStreak: 12,
      bestStreak: 18,
      tier: 3,
      decayLevel: 0,
      lastCompletedDate: today,
      completionHistory: consecutiveHistory(11, 12, base),
      createdAt: isoDaysAgo(20, base),
    },
    {
      id: "h3",
      name: "Practice Python",
      category: "tech",
      structureType: "signal_spire",
      accentColor: "#C9B6E4",
      frequency: "daily",
      currentStreak: 30,
      bestStreak: 30,
      tier: 4,
      decayLevel: 0,
      lastCompletedDate: today,
      completionHistory: consecutiveHistory(29, 30, base),
      createdAt: isoDaysAgo(30, base),
    },
    {
      id: "h4",
      name: "Evening Meditation",
      category: "mindfulness",
      structureType: "zen_garden_pod",
      accentColor: "#EAFBFF",
      frequency: "daily",
      currentStreak: 0,
      bestStreak: 9,
      tier: 2,
      decayLevel: 1,
      lastCompletedDate: isoDaysAgo(2, base),
      completionHistory: consecutiveHistory(10, 9, base),
      createdAt: isoDaysAgo(18, base),
    },
    {
      id: "h5",
      name: "Drink 8 Glasses of Water",
      category: "health",
      structureType: "hydro_well",
      accentColor: "#DCEEF7",
      frequency: "daily",
      currentStreak: 1,
      bestStreak: 4,
      tier: 1,
      decayLevel: 0,
      lastCompletedDate: today,
      completionHistory: [today],
      createdAt: isoDaysAgo(6, base),
    },
    {
      id: "h6",
      name: "No Phone After 9pm",
      category: "custom",
      structureType: "nova_pod",
      novaPodVariant: "arch",
      accentColor: "#B7A8B3",
      frequency: "daily",
      currentStreak: 0,
      bestStreak: 11,
      tier: 1,
      decayLevel: 3,
      lastCompletedDate: isoDaysAgo(7, base),
      completionHistory: consecutiveHistory(17, 11, base),
      createdAt: isoDaysAgo(24, base),
    },
    {
      id: "h7",
      name: "Sketch Something",
      category: "creativity",
      structureType: "aurora_pavilion",
      accentColor: "#FFD9C0",
      frequency: [1, 3, 5],
      currentStreak: 3,
      bestStreak: 6,
      tier: 2,
      decayLevel: 0,
      lastCompletedDate: today,
      completionHistory: weekdayHistory(13, [1, 3, 5], base),
      createdAt: isoDaysAgo(14, base),
    },
  ];
}
