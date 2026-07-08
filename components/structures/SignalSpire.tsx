"use client";
import { motion } from "framer-motion";
import StructureBase from "./StructureBase";
import { StructureVisualProps } from "./types";

export default function SignalSpire({
  tier,
  decayLevel,
  accentColor,
  seed = 3,
}: StructureVisualProps) {
  const orbits = Math.max(0, tier - 2);
  return (
    <StructureBase tier={tier} decayLevel={decayLevel} accentColor={accentColor} seed={seed}>
      <ellipse cx="100" cy="188" rx="30" ry="8" fill={accentColor} opacity="0.18" />
      {/* crystal spire */}
      <polygon points="100,40 122,120 100,188 78,120" fill={accentColor} opacity="0.85" />
      <polygon points="100,40 111,120 100,150 89,120" fill="#FFFFFF" opacity="0.3" />
      {/* orbiting rings, count scales with tier */}
      {Array.from({ length: orbits }).map((_, i) => (
        <motion.ellipse
          key={i}
          cx="100"
          cy="95"
          rx={30 + i * 14}
          ry={8 + i * 3}
          fill="none"
          stroke="#EAFBFF"
          strokeWidth="1.6"
          opacity={0.5}
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 95px" }}
        />
      ))}
      {/* beacon tip */}
      <circle cx="100" cy="38" r="6" fill="#EAFBFF" opacity={tier >= 3 ? 1 : 0.5} />
    </StructureBase>
  );
}
