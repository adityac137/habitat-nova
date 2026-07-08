"use client";

import { useIsland } from "@/lib/IslandContext";
import Onboarding from "@/components/Onboarding";
import IslandMap from "@/components/IslandMap";
import NavBar from "@/components/NavBar";

export default function HomePage() {
  const { state, ready } = useIsland();

  if (!ready) return null;

  if (!state.onboarded) {
    return <Onboarding />;
  }

  return (
    <>
      <IslandMap />
      <NavBar />
    </>
  );
}
