"use client";

import { IslandState } from "./types";
import { generateSeedHabits } from "./seedData";
import { computeVitality } from "./gameLogic";

const STORAGE_KEY = "habitat-nova-state-v1";

export function loadIslandState(): IslandState {
  if (typeof window === "undefined") {
    return { habits: [], vitalityScore: 72, onboarded: false, soundEnabled: false };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as IslandState;
      if (parsed && Array.isArray(parsed.habits)) {
        return parsed;
      }
    }
  } catch {
    // fall through to seed
  }
  const habits = generateSeedHabits();
  const seeded: IslandState = {
    habits,
    vitalityScore: computeVitality(habits),
    onboarded: false,
    soundEnabled: false,
  };
  return seeded;
}

export function saveIslandState(state: IslandState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable — fail silently, MVP has no fallback
  }
}

export function clearIslandState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
