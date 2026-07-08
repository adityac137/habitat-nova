"use client";

import { motion } from "framer-motion";
import {
  DecayLevel,
  Tier,
  auraAllowed,
  decayBrightness,
  decaySaturation,
  particlesAllowed,
  shimmerAllowed,
  tierScale,
  vineCount,
  vineOpacity,
  vinePaths,
} from "@/lib/structureVisuals";

interface StructureBaseProps {
  tier: Tier;
  decayLevel: DecayLevel;
  accentColor: string;
  seed?: number;
  children: React.ReactNode;
  label?: string;
}

export default function StructureBase({
  tier,
  decayLevel,
  accentColor,
  seed = 0,
  children,
}: StructureBaseProps) {
  const scale = tierScale(tier);
  const sat = decaySaturation(decayLevel);
  const bright = decayBrightness(decayLevel);
  const showAura = auraAllowed(tier, decayLevel);
  const showParticles = particlesAllowed(tier, decayLevel);
  const showShimmer = shimmerAllowed(tier, decayLevel);
  const vines = vinePaths(vineCount(decayLevel), seed);
  const vOpacity = vineOpacity(decayLevel);

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
      <defs>
        <radialGradient id={`aura-${seed}`} cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`shimmer-${seed}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EAFBFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#EAFBFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#EAFBFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {showAura && (
        <motion.circle
          cx="100"
          cy="120"
          r="70"
          fill={`url(#aura-${seed})`}
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 120px" }}
        />
      )}

      <g
        style={{
          filter: `saturate(${sat}) brightness(${bright})`,
          transformOrigin: "100px 190px",
        }}
        transform={`translate(${100 - 100 * scale}, ${190 - 190 * scale}) scale(${scale})`}
      >
        {children}
      </g>

      {showParticles && (
        <g>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={78 + i * 22}
              cy={90}
              r={2.2}
              fill="#EAFBFF"
              animate={{
                cy: [95, 55, 95],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 1.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      )}

      {showShimmer && (
        <motion.rect
          x="20"
          y="20"
          width="160"
          height="160"
          fill={`url(#shimmer-${seed})`}
          animate={{ x: [-180, 180] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ mixBlendMode: "screen" }}
        />
      )}

      {vOpacity > 0 && (
        <g opacity={vOpacity}>
          {vines.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#8FA98C"
              strokeWidth={3}
              strokeLinecap="round"
              animate={{ rotate: [-1.5, 1.5, -1.5] }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "100px 190px" }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
