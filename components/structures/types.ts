import { DecayLevel, Tier } from "@/lib/structureVisuals";
import { NovaPodVariant } from "@/lib/types";

export interface StructureVisualProps {
  tier: Tier;
  decayLevel: DecayLevel;
  accentColor: string;
  seed?: number;
  variant?: NovaPodVariant;
}
