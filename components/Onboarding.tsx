"use client";

import { motion } from "framer-motion";
import { useIsland } from "@/lib/IslandContext";
import StructureRenderer from "./structures/StructureRenderer";

export default function Onboarding() {
  const { finishOnboarding } = useIsland();

  const preview = [
    { structureType: "signal_spire", tier: 5, decayLevel: 0, accentColor: "#C9B6E4" },
    { structureType: "athenaeum_dome", tier: 4, decayLevel: 0, accentColor: "#FFD9C0" },
    { structureType: "aurora_pavilion", tier: 3, decayLevel: 0, accentColor: "#A8E6CF" },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* ambient star specks */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              top: `${(i * 37) % 90}%`,
              left: `${(i * 53) % 95}%`,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-md"
      >
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-lavendergrey mb-3">
          Habitat Nova
        </span>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-slateplum leading-tight mb-3">
          Where your habits
          <br /> build a world.
        </h1>
        <p className="text-slateplum/80 text-base leading-relaxed mb-8">
          Forget checkboxes and guilt-trip streak graphs. Every habit gets its
          own little structure on your island — it glows when you show up,
          and just goes quiet (never gone) when you don&apos;t. Low pressure,
          high main-character-energy.
        </p>

        <div className="glass-card rounded-cozylg px-6 py-8 mb-8 w-full">
          <div className="flex justify-center items-end gap-6 h-28">
            {preview.map((p, i) => (
              <motion.div
                key={i}
                className="w-16 h-24"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              >
                <StructureRenderer
                  habit={
                    {
                      id: `preview-${i}`,
                      structureType: p.structureType,
                      tier: p.tier,
                      decayLevel: p.decayLevel,
                      accentColor: p.accentColor,
                    } as any
                  }
                />
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-lavendergrey mt-3 tracking-wide">
            a tiny glimpse of Habit Island
          </p>
        </div>

        <button
          onClick={finishOnboarding}
          className="bg-slateplum text-cream font-heading font-semibold text-base px-8 py-4 rounded-cozylg shadow-soft hover:opacity-90 active:scale-[0.98] transition-all duration-300"
        >
          Enter Your Island
        </button>
      </motion.div>
    </div>
  );
}
