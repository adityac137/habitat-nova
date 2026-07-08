"use client";
import { motion } from "framer-motion";
import StructureBase from "./StructureBase";
import { StructureVisualProps } from "./types";

export default function AuroraPavilion({
  tier,
  decayLevel,
  accentColor,
  seed = 6,
}: StructureVisualProps) {
  return (
    <StructureBase tier={tier} decayLevel={decayLevel} accentColor={accentColor} seed={seed}>
      <ellipse cx="100" cy="188" rx="52" ry="8" fill={accentColor} opacity="0.18" />
      {/* pillars */}
      {[62, 138].map((x, i) => (
        <rect key={i} x={x - 4} y="110" width="8" height="76" rx="3" fill={accentColor} opacity="0.7" />
      ))}
      {tier >= 4 && (
        <>
          <rect x="96" y="110" width="8" height="76" rx="3" fill={accentColor} opacity="0.5" />
        </>
      )}
      {/* canopy */}
      <motion.path
        d="M 45 112 Q 100 78 155 112 L 148 122 Q 100 96 52 122 Z"
        fill={accentColor}
        animate={
          tier >= 3 && decayLevel < 2
            ? { fill: [accentColor, "#C9B6E4", "#A8E6CF", accentColor] }
            : {}
        }
        transition={{ duration: 8, repeat: Infinity }}
        opacity="0.9"
      />
      {tier >= 5 && (
        <ellipse cx="100" cy="100" rx="55" ry="10" fill="#EAFBFF" opacity="0.35" />
      )}
    </StructureBase>
  );
}
