"use client";

import { useState } from "react";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useIsland } from "@/lib/IslandContext";
import NavBar from "@/components/NavBar";

export default function SettingsPage() {
  const { state, ready, resetIsland, toggleSound } = useIsland();
  const [confirmReset, setConfirmReset] = useState(false);

  if (!ready) return null;

  return (
    <div className="min-h-screen px-4 pt-8 pb-32 md:pl-32 md:pr-10 md:pt-10">
      <div className="max-w-lg mx-auto">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-lavendergrey">
          Habitat Nova
        </p>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slateplum mb-8">
          Settings
        </h1>

        <div className="glass-card rounded-cozylg p-5 mb-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slateplum text-sm">Ambient sound</p>
            <p className="text-xs text-lavendergrey mt-0.5">
              A soft island hum while you check in
            </p>
          </div>
          <button
            onClick={toggleSound}
            className={`w-14 h-14 rounded-cozy flex items-center justify-center transition-colors duration-300 ${
              state.soundEnabled ? "bg-mint/50 text-slateplum" : "bg-lavendermist/50 text-lavendergrey"
            }`}
            aria-label="Toggle ambient sound"
          >
            {state.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="glass-card rounded-cozylg p-5">
          <p className="font-semibold text-slateplum text-sm mb-0.5">Reset island</p>
          <p className="text-xs text-lavendergrey mb-4">
            Clears every habit and starts fresh with the sample island. This can&apos;t be undone.
          </p>
          <button
            onClick={() => {
              if (confirmReset) {
                resetIsland();
                setConfirmReset(false);
              } else {
                setConfirmReset(true);
                setTimeout(() => setConfirmReset(false), 3000);
              }
            }}
            className={`w-full py-3 rounded-cozy font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-300 ${
              confirmReset ? "bg-dusty/70 text-white" : "bg-lavendermist/50 text-slateplum"
            }`}
          >
            <RotateCcw size={16} />
            {confirmReset ? "Tap again to confirm" : "Reset my island"}
          </button>
        </div>

        <p className="text-xs text-lavendergrey text-center mt-8">
          Habitat Nova stores everything only on this device — nothing leaves your browser.
        </p>
      </div>
      <NavBar />
    </div>
  );
}
