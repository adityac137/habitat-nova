import StructureBase from "./StructureBase";
import { StructureVisualProps } from "./types";

export default function ZenGardenPod({
  tier,
  decayLevel,
  accentColor,
  seed = 4,
}: StructureVisualProps) {
  const petals = Array.from({ length: tier });
  return (
    <StructureBase tier={tier} decayLevel={decayLevel} accentColor={accentColor} seed={seed}>
      {/* raked sand ring */}
      <ellipse cx="100" cy="182" rx="60" ry="14" fill="#FAF6F0" opacity="0.6" />
      <ellipse cx="100" cy="182" rx="60" ry="14" fill="none" stroke={accentColor} strokeOpacity="0.4" strokeWidth="2" />
      <ellipse cx="100" cy="180" rx="44" ry="10" fill="none" stroke={accentColor} strokeOpacity="0.3" strokeWidth="1.4" />
      {/* pod */}
      <circle cx="100" cy="135" r="42" fill={accentColor} opacity="0.85" />
      <circle cx="88" cy="120" r="12" fill="#FFFFFF" opacity="0.25" />
      {petals.map((_, i) => {
        const angle = (i / Math.max(petals.length, 1)) * Math.PI * 2;
        const x = 100 + Math.cos(angle) * 56;
        const y = 135 + Math.sin(angle) * 56;
        return <circle key={i} cx={x} cy={y} r="6" fill="#EAFBFF" opacity="0.7" />;
      })}
    </StructureBase>
  );
}
