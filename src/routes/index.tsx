import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { LazySection } from "@/components/LazySection";
import { FloatingCTA } from "@/components/FloatingCTA";
import { useLenis } from "@/lib/use-lenis";

// Below-the-fold sections — split into separate JS chunks
const MachineBreakdown = lazy(() =>
  import("@/components/sections/MachineBreakdown").then((m) => ({ default: m.MachineBreakdown })),
);
const Technology = lazy(() =>
  import("@/components/sections/Technology").then((m) => ({ default: m.Technology })),
);
const Locations = lazy(() =>
  import("@/components/sections/Locations").then((m) => ({ default: m.Locations })),
);
const Stats = lazy(() =>
  import("@/components/sections/Stats").then((m) => ({ default: m.Stats })),
);
const FinalCTA = lazy(() =>
  import("@/components/sections/FinalCTA").then((m) => ({ default: m.FinalCTA })),
);

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="relative bg-background text-foreground">
      {/* Above the fold — always eager */}
      <Nav />
      <Hero />
      <FloatingCTA />

      {/* Below the fold — deferred until near viewport */}
      <LazySection minHeight="100vh">
        <MachineBreakdown />
      </LazySection>

      <LazySection minHeight="60vh">
        <Technology />
      </LazySection>

      <LazySection minHeight="60vh">
        <Locations />
      </LazySection>

      <LazySection minHeight="40vh">
        <Stats />
      </LazySection>

      <LazySection minHeight="80vh">
        <FinalCTA />
      </LazySection>
    </main>
  );
}
