import StructureBase from "./StructureBase";
import { StructureVisualProps } from "./types";

export default function NovaPod({
  tier,
  decayLevel,
  accentColor,
  seed = 7,
  variant = "dome",
}: StructureVisualProps) {
  const detail = Array.from({ length: tier });
  return (
    <StructureBase tier={tier} decayLevel={decayLevel} accentColor={accentColor} seed={seed}>
      <ellipse cx="100" cy="188" rx="40" ry="8" fill={accentColor} opacity="0.18" />

      {variant === "dome" && (
        <>
          <path d="M 60 155 A 40 48 0 0 1 140 155 Z" fill={accentColor} opacity="0.85" />
          <rect x="60" y="155" width="80" height="26" rx="6" fill={accentColor} opacity="0.6" />
        </>
      )}
      {variant === "crystal" && (
        <polygon points="100,55 132,110 118,180 82,180 68,110" fill={accentColor} opacity="0.85" />
      )}
      {variant === "arch" && (
        <path
          d="M 62 181 L 62 120 A 38 38 0 0 1 138 120 L 138 181 Z"
          fill={accentColor}
          opacity="0.85"
        />
      )}

      {detail.map((_, i) => (
        <circle
          key={i}
          cx={78 + ((i * 15) % 44)}
          cy={140 - ((i * 12) % 40)}
          r="3"
          fill="#EAFBFF"
          opacity="0.65"
        />
      ))}
    </StructureBase>
  );
}
