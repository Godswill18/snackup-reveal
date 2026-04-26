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
  head: () => ({
    meta: [
      { title: "SnackUP Vending — Reinventing Automated Retail" },
      {
        name: "description",
        content:
          "SnackUP Vending: AI-powered smart vending machines with contactless payments, real-time telemetry and cinematic design. Snack More. Live More.",
      },
      { property: "og:title", content: "SnackUP Vending — The Future of Smart Vending" },
      {
        property: "og:description",
        content:
          "Premium, AI-powered vending machines reimagined for offices, gyms, airports and more.",
      },
    ],
  }),
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
