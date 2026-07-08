import { Habit } from "@/lib/types";
import { DecayLevel, Tier } from "@/lib/structureVisuals";
import FitnessTower from "./FitnessTower";
import AthenaeumDome from "./AthenaeumDome";
import SignalSpire from "./SignalSpire";
import ZenGardenPod from "./ZenGardenPod";
import HydroWell from "./HydroWell";
import AuroraPavilion from "./AuroraPavilion";
import NovaPod from "./NovaPod";

export default function StructureRenderer({ habit }: { habit: Habit }) {
  const props = {
    tier: habit.tier as Tier,
    decayLevel: habit.decayLevel as DecayLevel,
    accentColor: habit.accentColor,
    seed: hashSeed(habit.id),
  };

  switch (habit.structureType) {
    case "fitness_tower":
      return <FitnessTower {...props} />;
    case "athenaeum_dome":
      return <AthenaeumDome {...props} />;
    case "signal_spire":
      return <SignalSpire {...props} />;
    case "zen_garden_pod":
      return <ZenGardenPod {...props} />;
    case "hydro_well":
      return <HydroWell {...props} />;
    case "aurora_pavilion":
      return <AuroraPavilion {...props} />;
    case "nova_pod":
      return <NovaPod {...props} variant={habit.novaPodVariant || "dome"} />;
    default:
      return <NovaPod {...props} variant="dome" />;
  }
}

function hashSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h) % 1000;
}
