export type Tier = 1 | 2 | 3 | 4 | 5;
export type DecayLevel = 0 | 1 | 2 | 3;

export function tierScale(tier: Tier): number {
  return 0.7 + (tier - 1) * 0.09; // 0.70 -> 1.06
}

export function decaySaturation(decay: DecayLevel): number {
  return [1, 0.82, 0.55, 0.3][decay];
}

export function decayBrightness(decay: DecayLevel): number {
  return [1, 0.94, 0.85, 0.72][decay];
}

export function vineOpacity(decay: DecayLevel): number {
  return [0, 0, 0.65, 0.95][decay];
}

export function vineCount(decay: DecayLevel): number {
  return [0, 0, 2, 5][decay];
}

export function auraAllowed(tier: Tier, decay: DecayLevel): boolean {
  return tier >= 3 && decay < 2;
}

export function particlesAllowed(tier: Tier, decay: DecayLevel): boolean {
  return tier >= 4 && decay < 2;
}

export function shimmerAllowed(tier: Tier, decay: DecayLevel): boolean {
  return tier >= 5 && decay < 2;
}

export function lightOpacity(tier: Tier, decay: DecayLevel, index: number): number {
  // more lights "on" at higher tiers; decay dims / flickers them
  const litThreshold = 6 - tier; // tier5 -> most lights lit
  const isLit = index >= litThreshold;
  if (!isLit) return 0;
  if (decay === 0) return 1;
  if (decay === 1) return 0.6;
  if (decay === 2) return 0.35;
  return 0.15;
}

/** Deterministic-ish vine tendril paths that creep from the base upward. */
export function vinePaths(count: number, seed = 0): string[] {
  const paths: string[] = [];
  const baseXs = [40, 70, 100, 130, 160];
  for (let i = 0; i < count; i++) {
    const x = baseXs[(i + seed) % baseXs.length];
    const wobble = 8 + ((i * 7 + seed * 3) % 10);
    const height = 55 + ((i * 11 + seed) % 40);
    paths.push(
      `M ${x} 190 C ${x - wobble} ${190 - height * 0.4}, ${x + wobble} ${
        190 - height * 0.7
      }, ${x - wobble / 2} ${190 - height}`
    );
  }
  return paths;
}
