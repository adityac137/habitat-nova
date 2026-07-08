"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Habit, IslandState, NovaPodVariant } from "./types";
import { loadIslandState, saveIslandState, clearIslandState } from "./storage";
import {
  completeHabit as completeHabitLogic,
  computeVitality,
  matchCategoryFromName,
  novaPodVariantFromName,
  pastelColorFromName,
  recomputeLiveState,
  structureForCategory,
  todayISO,
} from "./gameLogic";
import { generateSeedHabits } from "./seedData";

interface NewHabitInput {
  name: string;
  category: Habit["category"];
  frequency: "daily" | number[];
  accentColorOverride?: string;
}

interface IslandContextValue {
  state: IslandState;
  ready: boolean;
  liveHabits: Habit[];
  completeHabit: (id: string) => void;
  addHabit: (input: NewHabitInput) => void;
  deleteHabit: (id: string) => void;
  updateHabit: (id: string, patch: Partial<Habit>) => void;
  resetIsland: () => void;
  finishOnboarding: () => void;
  toggleSound: () => void;
}

const IslandContext = createContext<IslandContextValue | null>(null);

export function IslandProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<IslandState>({
    habits: [],
    vitalityScore: 72,
    onboarded: false,
    soundEnabled: false,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadIslandState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveIslandState(state);
  }, [state, ready]);

  const liveHabits = useMemo(() => {
    const today = todayISO();
    return state.habits.map((h) => recomputeLiveState(h, today));
  }, [state.habits]);

  const completeHabit = useCallback((id: string) => {
    setState((prev) => {
      const habits = prev.habits.map((h) =>
        h.id === id ? completeHabitLogic(h) : h
      );
      return { ...prev, habits, vitalityScore: computeVitality(habits) };
    });
  }, []);

  const addHabit = useCallback((input: NewHabitInput) => {
    setState((prev) => {
      const category =
        input.category === "custom"
          ? matchCategoryFromName(input.name)
          : input.category;
      const structureType = structureForCategory(category);
      const isNovaPod = structureType === "nova_pod";
      const accentColor =
        input.accentColorOverride ||
        (isNovaPod ? pastelColorFromName(input.name) : undefined) ||
        "#A8E6CF";
      const novaPodVariant: NovaPodVariant | undefined = isNovaPod
        ? novaPodVariantFromName(input.name)
        : undefined;

      const newHabit: Habit = {
        id: `h_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: input.name.trim() || "New Habit",
        category,
        structureType,
        accentColor,
        novaPodVariant,
        frequency: input.frequency,
        currentStreak: 0,
        bestStreak: 0,
        tier: 1,
        decayLevel: 0,
        lastCompletedDate: null,
        completionHistory: [],
        createdAt: todayISO(),
      };
      const habits = [...prev.habits, newHabit];
      return { ...prev, habits, vitalityScore: computeVitality(habits) };
    });
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setState((prev) => {
      const habits = prev.habits.filter((h) => h.id !== id);
      return { ...prev, habits, vitalityScore: computeVitality(habits) };
    });
  }, []);

  const updateHabit = useCallback((id: string, patch: Partial<Habit>) => {
    setState((prev) => {
      const habits = prev.habits.map((h) =>
        h.id === id ? { ...h, ...patch } : h
      );
      return { ...prev, habits, vitalityScore: computeVitality(habits) };
    });
  }, []);

  const resetIsland = useCallback(() => {
    clearIslandState();
    const habits = generateSeedHabits();
    setState({
      habits,
      vitalityScore: computeVitality(habits),
      onboarded: true,
      soundEnabled: false,
    });
  }, []);

  const finishOnboarding = useCallback(() => {
    setState((prev) => ({ ...prev, onboarded: true }));
  }, []);

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const value: IslandContextValue = {
    state,
    ready,
    liveHabits,
    completeHabit,
    addHabit,
    deleteHabit,
    updateHabit,
    resetIsland,
    finishOnboarding,
    toggleSound,
  };

  return (
    <IslandContext.Provider value={value}>{children}</IslandContext.Provider>
  );
}

export function useIsland() {
  const ctx = useContext(IslandContext);
  if (!ctx) throw new Error("useIsland must be used within IslandProvider");
  return ctx;
}
