import StructureBase from "./StructureBase";
import { StructureVisualProps } from "./types";

export default function AthenaeumDome({
  tier,
  decayLevel,
  accentColor,
  seed = 2,
}: StructureVisualProps) {
  const motes = Array.from({ length: tier });
  return (
    <StructureBase tier={tier} decayLevel={decayLevel} accentColor={accentColor} seed={seed}>
      <ellipse cx="100" cy="188" rx="46" ry="8" fill={accentColor} opacity="0.18" />
      {/* base cylinder */}
      <rect x="62" y="140" width="76" height="48" rx="8" fill={accentColor} opacity="0.55" />
      {/* dome */}
      <path
        d="M 55 140 A 45 55 0 0 1 145 140 Z"
        fill={accentColor}
        opacity="0.85"
      />
      {/* glass sheen */}
      <path d="M 70 138 A 32 40 0 0 1 100 90" stroke="#FFFFFF" strokeWidth="4" opacity="0.4" fill="none" strokeLinecap="round" />
      {/* base fill line rises with tier */}
      <rect
        x="62"
        y={186 - tier * 8}
        width="76"
        height={tier * 8}
        fill="#EAFBFF"
        opacity="0.35"
        clipPath="inset(0 0 0 0 round 8px)"
      />
      {motes.map((_, i) => (
        <circle
          key={i}
          cx={78 + ((i * 13) % 44)}
          cy={110 - ((i * 17) % 30)}
          r="2.4"
          fill="#EAFBFF"
          opacity={0.6}
        />
      ))}
    </StructureBase>
  );
}
