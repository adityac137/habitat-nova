"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, Pencil, Check } from "lucide-react";
import { useIsland } from "@/lib/IslandContext";
import {
  alreadyTendedToday,
  last14Days,
} from "@/lib/gameLogic";
import {
  CATEGORY_PRESETS,
  DECAY_LABELS,
  STRUCTURE_LABELS,
  TIER_LABELS,
} from "@/lib/types";
import StructureRenderer from "./structures/StructureRenderer";

const TIER_FLOOR = [0, 3, 7, 14, 30];
const WEEKDAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

export default function HabitDetail({
  habitId,
  onClose,
}: {
  habitId: string;
  onClose: () => void;
}) {
  const { liveHabits, completeHabit, deleteHabit, updateHabit } = useIsland();
  const habit = liveHabits.find((h) => h.id === habitId);
  const [showBloom, setShowBloom] = useState(false);
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(habit?.name || "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dots = useMemo(() => (habit ? last14Days(habit) : []), [habit]);

  if (!habit) return null;

  const preset = CATEGORY_PRESETS.find((p) => p.category === habit.category);
  const tended = alreadyTendedToday(habit);
  const lower = TIER_FLOOR[habit.tier - 1];
  const next = TIER_FLOOR[habit.tier]; // undefined at tier 5
  const progress = habit.tier < 5 ? Math.min(1, (habit.currentStreak - lower) / (next - lower)) : 1;
  const daysToNext = habit.tier < 5 ? Math.max(0, next - habit.currentStreak) : 0;

  function handleComplete() {
    if (!habit || tended) return;
    completeHabit(habit.id);
    setShowBloom(true);
    setTimeout(() => setShowBloom(false), 1400);
  }

  function handleSaveEdit() {
    if (!habit) return;
    updateHabit(habit.id, { name: nameDraft.trim() || habit.name });
    setEditing(false);
  }

  function toggleFrequencyDay(day: number) {
    if (!habit) return;
    const current = habit.frequency === "daily" ? [] : habit.frequency;
    const next = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day].sort();
    updateHabit(habit.id, { frequency: next.length ? next : "daily" });
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
          className="glass-card-solid rounded-t-cozylg md:rounded-cozylg w-full md:w-[440px] max-h-[88vh] overflow-y-auto no-scrollbar p-6 relative"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-lavendergrey hover:text-slateplum"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* structure visual */}
          <div className="relative w-40 h-40 mx-auto mb-3">
            <StructureRenderer habit={habit} />
            <AnimatePresence>
              {showBloom && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-mint"
                      style={{ left: "50%", top: "60%" }}
                      initial={{ opacity: 0.9, x: 0, y: 0 }}
                      animate={{
                        opacity: 0,
                        x: Math.cos((i / 8) * Math.PI * 2) * 60,
                        y: Math.sin((i / 8) * Math.PI * 2) * 60 - 30,
                      }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {editing ? (
            <input
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              className="w-full text-center font-heading font-bold text-xl text-slateplum bg-transparent border-b border-lavendergrey/40 pb-1 mb-1 focus:outline-none"
            />
          ) : (
            <h2 className="text-center font-heading font-bold text-xl text-slateplum">
              {habit.name}
            </h2>
          )}
          <p className="text-center text-xs text-lavendergrey mt-1 tracking-wide">
            {preset?.structureName || STRUCTURE_LABELS[habit.structureType]} ·{" "}
            {habit.decayLevel > 0 ? DECAY_LABELS[habit.decayLevel] : "Thriving"}
          </p>

          {/* stats row */}
          <div className="flex justify-center gap-6 mt-5 mb-4">
            <Stat label="Streak" value={`${habit.currentStreak}d`} />
            <Stat label="Best" value={`${habit.bestStreak}d`} />
            <Stat label="Tier" value={`${habit.tier} / 5`} />
          </div>

          {/* progress bar */}
          <div className="mb-1 flex justify-between text-[11px] text-lavendergrey">
            <span>{TIER_LABELS[habit.tier]}</span>
            <span>
              {habit.tier < 5 ? `${daysToNext} day${daysToNext === 1 ? "" : "s"} to next tier` : "Fully bloomed"}
            </span>
          </div>
          <div className="h-2 rounded-full bg-lavendermist/60 overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-mint to-lilac rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* 14 day dots */}
          <p className="text-[11px] text-lavendergrey mb-2 tracking-wide">Last 14 days</p>
          <div className="flex justify-between mb-6">
            {dots.map((done, i) => (
              <span
                key={i}
                className={`w-3.5 h-3.5 rounded-full ${
                  done ? "bg-mint" : "bg-lavendermist/70"
                }`}
              />
            ))}
          </div>

          {/* frequency editor */}
          {editing && (
            <div className="mb-6">
              <p className="text-[11px] text-lavendergrey mb-2 tracking-wide">
                Scheduled days (tap to toggle — all on means daily)
              </p>
              <div className="flex justify-between">
                {WEEKDAY_LETTERS.map((letter, i) => {
                  const active =
                    habit.frequency === "daily" || habit.frequency.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleFrequencyDay(i)}
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
            </div>
          )}

          {/* primary action */}
          <button
            onClick={handleComplete}
            disabled={tended}
            className={`w-full py-4 rounded-cozy font-heading font-semibold text-base mb-3 transition-all duration-300 ${
              tended
                ? "bg-lavendermist/60 text-lavendergrey cursor-default"
                : "bg-slateplum text-cream hover:opacity-90 active:scale-[0.98]"
            }`}
          >
            {tended ? "Already tended today ✓" : "Complete Today"}
          </button>

          <div className="flex gap-3">
            {editing ? (
              <button
                onClick={handleSaveEdit}
                className="flex-1 py-3 rounded-cozy bg-mint/50 text-slateplum font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Check size={16} /> Save
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex-1 py-3 rounded-cozy bg-lavendermist/50 text-slateplum font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Pencil size={15} /> Edit
              </button>
            )}
            <button
              onClick={() => {
                if (confirmDelete) {
                  deleteHabit(habit.id);
                  onClose();
                } else {
                  setConfirmDelete(true);
                  setTimeout(() => setConfirmDelete(false), 3000);
                }
              }}
              className={`flex-1 py-3 rounded-cozy font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-300 ${
                confirmDelete
                  ? "bg-dusty/70 text-white"
                  : "bg-lavendermist/50 text-slateplum"
              }`}
            >
              <Trash2 size={15} /> {confirmDelete ? "Confirm?" : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-heading font-bold text-lg text-slateplum leading-none">
        {value}
      </p>
      <p className="text-[10px] text-lavendergrey mt-1 tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}
