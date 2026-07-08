"use client";

import { motion } from "framer-motion";
import { useIsland } from "@/lib/IslandContext";
import { vitalityMood } from "@/lib/gameLogic";
import NavBar from "@/components/NavBar";
import { Flame, Sprout, Ghost, Gauge } from "lucide-react";

export default function StatsPage() {
  const { liveHabits, state, ready } = useIsland();

  if (!ready) return null;

  const longestStreak = liveHabits.reduce(
    (max, h) => Math.max(max, h.bestStreak),
    0
  );
  const thriving = liveHabits.filter((h) => h.decayLevel === 0).length;
  const decaying = liveHabits.filter((h) => h.decayLevel > 0).length;
  const mood = vitalityMood(state.vitalityScore);

  const cards = [
    {
      icon: Gauge,
      label: "Island Vitality",
      value: `${state.vitalityScore}`,
      sub: mood.description,
    },
    {
      icon: Flame,
      label: "Longest streak",
      value: `${longestStreak} day${longestStreak === 1 ? "" : "s"}`,
      sub: "Your all-time record",
    },
    {
      icon: Sprout,
      label: "Thriving",
      value: `${thriving}`,
      sub: `of ${liveHabits.length} habit${liveHabits.length === 1 ? "" : "s"}`,
    },
    {
      icon: Ghost,
      label: "Needs tending",
      value: `${decaying}`,
      sub: decaying === 0 ? "Nothing's overgrown right now" : "Give these some love",
    },
  ];

  return (
    <div className="min-h-screen px-4 pt-8 pb-32 md:pl-32 md:pr-10 md:pt-10">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-lavendergrey">
          Habitat Nova
        </p>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slateplum mb-8">
          Your Progress
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              className="glass-card rounded-cozylg p-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <c.icon size={22} className="text-lilac mb-3" strokeWidth={1.8} />
              <p className="font-heading font-bold text-2xl text-slateplum leading-none mb-1">
                {c.value}
              </p>
              <p className="text-sm font-semibold text-slateplum/80">{c.label}</p>
              <p className="text-xs text-lavendergrey mt-1">{c.sub}</p>
            </motion.div>
          ))}
        </div>

        {liveHabits.length > 0 && (
          <div className="glass-card rounded-cozylg p-5 mt-4">
            <p className="text-sm font-semibold text-slateplum mb-3">
              Every habit, at a glance
            </p>
            <div className="space-y-2">
              {liveHabits.map((h) => (
                <div key={h.id} className="flex items-center justify-between">
                  <span className="text-sm text-slateplum/85">{h.name}</span>
                  <span className="text-xs text-lavendergrey">
                    Tier {h.tier} · {h.currentStreak}d streak
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
}
