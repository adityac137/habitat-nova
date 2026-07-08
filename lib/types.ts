export type Category =
  | "fitness"
  | "reading"
  | "tech"
  | "mindfulness"
  | "health"
  | "creativity"
  | "custom";

export type StructureType =
  | "fitness_tower"
  | "athenaeum_dome"
  | "signal_spire"
  | "zen_garden_pod"
  | "hydro_well"
  | "aurora_pavilion"
  | "nova_pod";

export type NovaPodVariant = "dome" | "crystal" | "arch";

export interface Habit {
  id: string;
  name: string;
  category: Category;
  structureType: StructureType;
  accentColor: string; // hex
  novaPodVariant?: NovaPodVariant; // only used when structureType === nova_pod
  frequency: "daily" | number[]; // number[] = days of week, 0 (Sun) - 6 (Sat)
  currentStreak: number;
  bestStreak: number;
  tier: 1 | 2 | 3 | 4 | 5;
  decayLevel: 0 | 1 | 2 | 3;
  lastCompletedDate: string | null; // ISO yyyy-mm-dd
  completionHistory: string[]; // ISO yyyy-mm-dd, most recent 30 kept
  createdAt: string; // ISO date
}

export interface IslandState {
  habits: Habit[];
  vitalityScore: number; // 0-100 derived
  onboarded: boolean;
  soundEnabled: boolean;
}

export interface CategoryPreset {
  category: Category;
  structureType: StructureType;
  label: string;
  structureName: string;
  blurb: string;
  defaultAccent: string;
  keywords: string[];
}

export const CATEGORY_PRESETS: CategoryPreset[] = [
  {
    category: "fitness",
    structureType: "fitness_tower",
    label: "Gym / Fitness",
    structureName: "Fitness Tower",
    blurb: "A slender tower with energy rings that multiply as you grow.",
    defaultAccent: "#A8E6CF",
    keywords: [
      "gym",
      "run",
      "running",
      "workout",
      "lift",
      "lifting",
      "exercise",
      "fitness",
      "cardio",
      "yoga",
      "stretch",
      "walk",
      "steps",
      "training",
      "sport",
    ],
  },
  {
    category: "reading",
    structureType: "athenaeum_dome",
    label: "Library / Reading",
    structureName: "Athenaeum Dome",
    blurb: "A glass dome that fills with warm light and floating pages.",
    defaultAccent: "#FFD9C0",
    keywords: [
      "read",
      "reading",
      "book",
      "books",
      "novel",
      "chapter",
      "library",
      "article",
    ],
  },
  {
    category: "tech",
    structureType: "signal_spire",
    label: "Tech Hub / Learning",
    structureName: "Signal Spire",
    blurb: "A crystal spire with a pulsing beacon that gains orbiting rings.",
    defaultAccent: "#C9B6E4",
    keywords: [
      "code",
      "coding",
      "program",
      "study",
      "learn",
      "learning",
      "python",
      "javascript",
      "course",
      "class",
      "homework",
      "language",
      "practice",
      "skill",
    ],
  },
  {
    category: "mindfulness",
    structureType: "zen_garden_pod",
    label: "Mindfulness",
    structureName: "Zen Garden Pod",
    blurb: "A round pod ringed with sand that grows soft floating petals.",
    defaultAccent: "#EAFBFF",
    keywords: [
      "meditate",
      "meditation",
      "breathe",
      "breathing",
      "journal",
      "journaling",
      "gratitude",
      "mindfulness",
      "calm",
      "reflect",
    ],
  },
  {
    category: "health",
    structureType: "hydro_well",
    label: "Health / Nutrition",
    structureName: "Hydro Well",
    blurb: "A glowing well that fills with water and blooms lily-pads.",
    defaultAccent: "#DCEEF7",
    keywords: [
      "water",
      "drink",
      "hydrate",
      "eat",
      "sleep",
      "vitamins",
      "nutrition",
      "meal",
      "diet",
      "skincare",
    ],
  },
  {
    category: "creativity",
    structureType: "aurora_pavilion",
    label: "Creativity / Art",
    structureName: "Aurora Pavilion",
    blurb: "An open pavilion under a canopy that shifts color as it grows.",
    defaultAccent: "#FFD9C0",
    keywords: [
      "draw",
      "drawing",
      "paint",
      "painting",
      "sketch",
      "write",
      "writing",
      "music",
      "sing",
      "play",
      "design",
      "create",
      "creativity",
      "art",
    ],
  },
  {
    category: "custom",
    structureType: "nova_pod",
    label: "Custom",
    structureName: "Nova Pod",
    blurb: "A one-of-a-kind pod, shaped and colored just for this habit.",
    defaultAccent: "#B7A8B3",
    keywords: [],
  },
];

export const STRUCTURE_LABELS: Record<StructureType, string> = {
  fitness_tower: "Fitness Tower",
  athenaeum_dome: "Athenaeum Dome",
  signal_spire: "Signal Spire",
  zen_garden_pod: "Zen Garden Pod",
  hydro_well: "Hydro Well",
  aurora_pavilion: "Aurora Pavilion",
  nova_pod: "Nova Pod",
};

export const TIER_LABELS: Record<number, string> = {
  1: "Seedling",
  2: "Sprouting",
  3: "Rising",
  4: "Flourishing",
  5: "Radiant",
};

export const DECAY_LABELS: Record<number, string> = {
  0: "Thriving",
  1: "Resting",
  2: "Overgrown",
  3: "Dormant",
};
