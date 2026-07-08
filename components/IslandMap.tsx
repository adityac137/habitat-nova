"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sun, CloudSun, Cloud, CloudFog, Moon } from "lucide-react";
import { useIsland } from "@/lib/IslandContext";
import { vitalityMood } from "@/lib/gameLogic";
import { TIER_LABELS, DECAY_LABELS } from "@/lib/types";
import StructureRenderer from "./structures/StructureRenderer";
import HabitDetail from "./HabitDetail";
import CreateHabitFlow from "./CreateHabitFlow";

const MOOD_ICON = {
  Radiant: Sun,
  Sunny: CloudSun,
  Misty: Cloud,
  Overcast: CloudFog,
  Dim: Moon,
} as const;

export default function IslandMap() {
  const { liveHabits, state } = useIsland();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const mood = vitalityMood(state.vitalityScore);
  const MoodIcon = MOOD_ICON[mood.label as keyof typeof MOOD_ICON] || Sun;

  return (
    <div className="min-h-screen px-4 pt-8 pb-32 md:pl-32 md:pr-10 md:pt-10">
      <div className="max-w-5xl mx-auto">
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-lavendergrey">
              Habitat Nova
            </p>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slateplum">
              Habit Island
            </h1>
          </div>
          <motion.div
            className="glass-card rounded-cozylg px-4 py-3 flex items-center gap-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-peach"
            >
              <MoodIcon size={26} strokeWidth={1.8} />
            </motion.div>
            <div className="text-left">
              <p className="text-sm font-heading font-semibold text-slateplum leading-none">
                {mood.label}
              </p>
              <p className="text-[11px] text-lavendergrey mt-1">
                Vitality {state.vitalityScore}
              </p>
            </div>
          </motion.div>
        </div>

        {liveHabits.length === 0 ? (
          <EmptyIsland onAdd={() => setShowCreate(true)} />
        ) : (
          <div className="flex flex-wrap gap-x-6 gap-y-10 justify-center md:justify-start">
            {liveHabits.map((habit, i) => (
              <motion.button
                key={habit.id}
                onClick={() => setSelectedId(habit.id)}
                className="w-32 sm:w-36 flex flex-col items-center group"
                style={{ transform: `translateY(${(i % 3) * 10 - 5}px)` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-500 group-hover:-translate-y-1">
                  <StructureRenderer habit={habit} />
                </div>
                <p className="mt-1 font-heading font-semibold text-sm text-slateplum text-center leading-tight">
                  {habit.name}
                </p>
                <p className="text-[11px] text-lavendergrey">
                  {habit.decayLevel > 0
                    ? DECAY_LABELS[habit.decayLevel]
                    : TIER_LABELS[habit.tier]}
                </p>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* floating add button */}
      <motion.button
        onClick={() => setShowCreate(true)}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 md:bottom-10 right-6 md:right-10 w-14 h-14 rounded-full bg-slateplum text-cream flex items-center justify-center shadow-soft z-30"
        aria-label="Add a new habit"
      >
        <Plus size={26} />
      </motion.button>

      {selectedId && (
        <HabitDetail
          habitId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}

      {showCreate && <CreateHabitFlow onClose={() => setShowCreate(false)} />}
    </div>
  );
}

function EmptyIsland({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="glass-card rounded-cozylg py-16 px-8 text-center max-w-md mx-auto mt-10">
      <p className="font-heading font-semibold text-lg text-slateplum mb-2">
        Your island is a blank shore.
      </p>
      <p className="text-sm text-lavendergrey mb-6">
        Plant your first habit and watch something grow.
      </p>
      <button
        onClick={onAdd}
        className="bg-slateplum text-cream font-heading font-semibold px-6 py-3 rounded-cozy"
      >
        Plant a habit
      </button>
    </div>
  );
}
