"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft, Sparkles } from "lucide-react";
import { useIsland } from "@/lib/IslandContext";
import { CATEGORY_PRESETS, Category } from "@/lib/types";
import {
  matchCategoryFromName,
  novaPodVariantFromName,
  pastelColorFromName,
} from "@/lib/gameLogic";
import StructureRenderer from "./structures/StructureRenderer";

const WEEKDAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];
const SWATCHES = ["#A8E6CF", "#FFD9C0", "#C9B6E4", "#DCEEF7", "#EAFBFF"];

export default function CreateHabitFlow({ onClose }: { onClose: () => void }) {
  const { addHabit } = useIsland();
  const [step, setStep] = useState<1 | 2>(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [frequencyDays, setFrequencyDays] = useState<number[] | "daily">("daily");
  const [colorOverride, setColorOverride] = useState<string | null>(null);

  const detectedCategory: Category = category === "custom" || !category
    ? (name.trim() ? matchCategoryFromName(name) : "custom")
    : category;

  const isCustomUnmatched = category === "custom" && detectedCategory === "custom";
  const previewColor =
    colorOverride ||
    (isCustomUnmatched && name.trim()
      ? pastelColorFromName(name)
      : CATEGORY_PRESETS.find((p) => p.category === detectedCategory)?.defaultAccent) ||
    "#A8E6CF";
  const previewVariant = isCustomUnmatched && name.trim() ? novaPodVariantFromName(name) : "dome";
  const previewStructureType =
    CATEGORY_PRESETS.find((p) => p.category === detectedCategory)?.structureType || "nova_pod";

  function handleSubmit() {
    if (!name.trim() || !category) return;
    addHabit({
      name: name.trim(),
      category,
      frequency: frequencyDays,
      accentColorOverride: colorOverride || undefined,
    });
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-slateplum/30 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card-solid rounded-t-cozylg md:rounded-cozylg w-full md:w-[480px] max-h-[88vh] overflow-y-auto no-scrollbar p-6 relative"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            {step === 2 ? (
              <button onClick={() => setStep(1)} className="text-lavendergrey">
                <ArrowLeft size={20} />
              </button>
            ) : (
              <span />
            )}
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-lavendergrey">
              Plant a habit · Step {step} of 2
            </p>
            <button onClick={onClose} className="text-lavendergrey hover:text-slateplum">
              <X size={20} />
            </button>
          </div>

          {step === 1 && (
            <>
              <h2 className="font-heading font-bold text-xl text-slateplum text-center mb-1">
                What kind of habit is this?
              </h2>
              <p className="text-sm text-lavendergrey text-center mb-6">
                Pick the closest vibe — it decides what grows on your island.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORY_PRESETS.map((preset) => (
                  <button
                    key={preset.category}
                    onClick={() => {
                      setCategory(preset.category);
                      setStep(2);
                    }}
                    className="glass-card rounded-cozy p-4 flex flex-col items-center hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    <div className="w-16 h-16 mb-2">
                      <StructureRenderer
                        habit={
                          {
                            id: preset.category,
                            structureType: preset.structureType,
                            tier: 3,
                            decayLevel: 0,
                            accentColor: preset.defaultAccent,
                            novaPodVariant: "dome",
                          } as any
                        }
                      />
                    </div>
                    <p className="font-heading font-semibold text-sm text-slateplum text-center leading-tight">
                      {preset.label}
                    </p>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && category && (
            <>
              <div className="w-24 h-24 mx-auto mb-4">
                <StructureRenderer
                  habit={
                    {
                      id: "preview",
                      structureType: previewStructureType,
                      tier: 1,
                      decayLevel: 0,
                      accentColor: previewColor,
                      novaPodVariant: previewVariant,
                    } as any
                  }
                />
              </div>

              <label className="block text-[11px] tracking-wide text-lavendergrey mb-1">
                Name your habit
              </label>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Morning Gym Session"
                className="w-full bg-white/60 border border-lavendermist rounded-cozy px-4 py-3 text-slateplum mb-5 focus:outline-none focus:ring-2 focus:ring-mint/60"
              />

              {category === "custom" && (
                <p className="text-xs text-lavendergrey -mt-3 mb-5 flex items-center gap-1">
                  <Sparkles size={13} />
                  {isCustomUnmatched
                    ? "This one gets a one-of-a-kind Nova Pod."
                    : `Sounds like a ${
                        CATEGORY_PRESETS.find((p) => p.category === detectedCategory)
                          ?.structureName
                      } to us.`}
                </p>
              )}

              <label className="block text-[11px] tracking-wide text-lavendergrey mb-2">
                How often?
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setFrequencyDays("daily")}
                  className={`px-4 py-2 rounded-cozy text-sm font-semibold transition-colors duration-300 ${
                    frequencyDays === "daily"
                      ? "bg-mint/60 text-slateplum"
                      : "bg-lavendermist/40 text-lavendergrey"
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setFrequencyDays(frequencyDays === "daily" ? [1, 3, 5] : frequencyDays)}
                  className={`px-4 py-2 rounded-cozy text-sm font-semibold transition-colors duration-300 ${
                    frequencyDays !== "daily"
                      ? "bg-mint/60 text-slateplum"
                      : "bg-lavendermist/40 text-lavendergrey"
                  }`}
                >
                  Specific days
                </button>
              </div>
              {frequencyDays !== "daily" && (
                <div className="flex justify-between mb-5">
                  {WEEKDAY_LETTERS.map((letter, i) => {
                    const active = frequencyDays.includes(i);
                    return (
                      <button
                        key={i}
                        onClick={() =>
                          setFrequencyDays((prev) => {
                            const arr = prev === "daily" ? [] : prev;
                            return arr.includes(i)
                              ? arr.filter((d) => d !== i)
                              : [...arr, i].sort();
                          })
                        }
                        className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors duration-300 ${
                          active
                            ? "bg-mint/70 text-slateplum"
                            : "bg-lavendermist/50 text-lavendergrey"
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              )}

              <label className="block text-[11px] tracking-wide text-lavendergrey mb-2">
                Accent color (optional)
              </label>
              <div className="flex gap-3 mb-6">
                {SWATCHES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColorOverride(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform duration-300 ${
                      colorOverride === c ? "border-slateplum scale-110" : "border-white/60"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!name.trim()}
                className="w-full py-4 rounded-cozy font-heading font-semibold text-base bg-slateplum text-cream disabled:opacity-40 hover:opacity-90 active:scale-[0.98] transition-all duration-300"
              >
                Plant it on my island
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
