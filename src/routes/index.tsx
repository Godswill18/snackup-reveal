import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { MachineBreakdown } from "@/components/sections/MachineBreakdown";
import { Technology } from "@/components/sections/Technology";
import { Locations } from "@/components/sections/Locations";
import { Stats } from "@/components/sections/Stats";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { useLenis } from "@/lib/use-lenis";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <MachineBreakdown />
      <Technology />
      <Locations />
      <Stats />
      <FinalCTA />
    </main>
  );
}
