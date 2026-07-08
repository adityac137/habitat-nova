import StructureBase from "./StructureBase";
import { StructureVisualProps } from "./types";

export default function FitnessTower({
  tier,
  decayLevel,
  accentColor,
  seed = 1,
}: StructureVisualProps) {
  const rings = Array.from({ length: tier });
  return (
    <StructureBase tier={tier} decayLevel={decayLevel} accentColor={accentColor} seed={seed}>
      {/* base plinth */}
      <ellipse cx="100" cy="188" rx="34" ry="8" fill={accentColor} opacity="0.18" />
      {/* tower shaft */}
      <rect x="84" y="55" width="32" height="132" rx="16" fill={accentColor} opacity="0.85" />
      <rect x="90" y="55" width="8" height="132" rx="4" fill="#FFFFFF" opacity="0.25" />
      {/* energy rings, one per tier */}
      {rings.map((_, i) => (
        <rect
          key={i}
          x={76}
          y={172 - i * 24}
          width="48"
          height="9"
          rx="4.5"
          fill="#EAFBFF"
          opacity={0.45 + i * 0.1}
        />
      ))}
      {/* beacon */}
      <circle cx="100" cy="48" r="9" fill="#EAFBFF" opacity={tier >= 3 ? 0.9 : 0.5} />
      <circle cx="100" cy="48" r="4" fill={accentColor} />
    </StructureBase>
  );
}
