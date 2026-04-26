import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vendingMachine from "@/assets/vending-machine.png";

const PARTS = [
  { id: "glass", label: "Front Glass", desc: "Anti-glare reinforced display panel.", x: -340, y: -200, rot: -12 },
  { id: "payment", label: "Smart Payment Terminal", desc: "Contactless, NFC & QR-ready.", x: 340, y: -160, rot: 10 },
  { id: "cooling", label: "Cooling Unit", desc: "Adaptive low-energy refrigeration.", x: -380, y: 80, rot: 8 },
  { id: "trays", label: "Snack Trays", desc: "Modular shelves with weight sensors.", x: 360, y: 60, rot: -8 },
  { id: "led", label: "LED Lighting Strips", desc: "Cinematic ambient interior glow.", x: -300, y: 260, rot: -6 },
  { id: "qr", label: "QR Support Module", desc: "Instant scan-to-buy from any phone.", x: 320, y: 280, rot: 12 },
];

export function MachineBreakdown() {
  const sectionRef = useRef<HTMLElement>(null);
  const machineRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: scale machine in
      tl.fromTo(
        machineRef.current,
        { scale: 0.55, y: 80, filter: "blur(8px)" },
        { scale: 1.15, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" },
      );

      // Phase 2: title fades out
      tl.to(titleRef.current, { opacity: 0, y: -50, duration: 0.4 }, "<0.2");

      // Phase 3: parts explode out
      const partEls = gsap.utils.toArray<HTMLElement>(".bd-part");
      tl.to(machineRef.current, { scale: 1.3, opacity: 0.35, duration: 1 }, ">");
      tl.fromTo(
        partEls,
        { x: 0, y: 0, opacity: 0, scale: 0.6, rotation: 0, filter: "blur(10px)" },
        {
          x: (i) => PARTS[i].x,
          y: (i) => PARTS[i].y,
          rotation: (i) => PARTS[i].rot,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.08,
          ease: "power3.out",
        },
        "<",
      );

      // Phase 4: keep floating
      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="machine"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/10 blur-[160px] pointer-events-none" />

      <h2
        ref={titleRef}
        className="absolute top-16 md:top-24 inset-x-0 text-center font-display font-bold text-3xl md:text-5xl px-6 z-20"
      >
        <span className="text-gradient">Look inside the </span>
        <span className="text-gradient-orange">machine.</span>
      </h2>

      <div
        ref={partsRef}
        className="absolute inset-0 flex items-center justify-center [perspective:1800px]"
      >
        {/* Machine */}
        <div ref={machineRef} className="relative w-[320px] md:w-[420px] z-10 transform-gpu">
          <div className="absolute -inset-10 bg-primary/30 blur-3xl rounded-full" />
          <img
            src={vendingMachine}
            alt="SnackUP machine cross-section"
            className="relative w-full object-contain"
          />
        </div>

        {/* Floating labeled parts */}
        {PARTS.map((p, i) => (
          <div
            key={p.id}
            className="bd-part absolute z-20 max-w-[180px] md:max-w-[220px] transform-gpu"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="glass-strong rounded-xl px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                <span className="text-[10px] tracking-widest uppercase text-primary font-semibold">
                  0{i + 1}
                </span>
              </div>
              <h4 className="font-display text-sm md:text-base font-semibold text-foreground">
                {p.label}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 inset-x-0 text-center text-[10px] tracking-[0.4em] text-muted-foreground">
        — KEEP SCROLLING —
      </div>
    </section>
  );
}
