import StructureBase from "./StructureBase";
import { StructureVisualProps } from "./types";

export default function HydroWell({
  tier,
  decayLevel,
  accentColor,
  seed = 5,
}: StructureVisualProps) {
  const lilies = Array.from({ length: Math.max(0, tier - 1) });
  return (
    <StructureBase tier={tier} decayLevel={decayLevel} accentColor={accentColor} seed={seed}>
      <ellipse cx="100" cy="188" rx="50" ry="9" fill={accentColor} opacity="0.18" />
      {/* well ring */}
      <path d="M 50 150 A 50 22 0 0 0 150 150 L 150 168 A 50 22 0 0 1 50 168 Z" fill={accentColor} opacity="0.75" />
      <ellipse cx="100" cy="150" rx="50" ry="22" fill="#EAFBFF" opacity={0.35 + tier * 0.08} />
      <ellipse cx="100" cy="150" rx="50" ry="22" fill="none" stroke={accentColor} strokeWidth="3" opacity="0.6" />
      {lilies.map((_, i) => (
        <ellipse
          key={i}
          cx={80 + ((i * 19) % 42)}
          cy={148 + ((i * 7) % 6)}
          rx="7"
          ry="3.4"
          fill="#8FA98C"
          opacity="0.7"
        />
      ))}
    </StructureBase>
  );
}
