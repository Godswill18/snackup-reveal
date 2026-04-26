import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vendingMachine from "@/assets/vending-machine.png";
import { Particles } from "./Particles";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 18 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  // Scroll-driven cinematic grading: bloom + vignette intensity follow scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const frame = frameRef.current;
    const img = imgRef.current;
    const section = sectionRef.current;
    if (!frame || !img || !section) return;

    const ctx = gsap.context(() => {
      const state = {
        bloom: 1,
        vignette: 1,
        warm: 1,
        cool: 1,
        bright: 0.85,
        contrast: 1.18,
        sat: 1.15,
        hue: -6,
      };

      const apply = () => {
        frame.style.setProperty("--cine-bloom", state.bloom.toFixed(3));
        frame.style.setProperty("--cine-vignette", state.vignette.toFixed(3));
        frame.style.setProperty("--cine-warm", state.warm.toFixed(3));
        frame.style.setProperty("--cine-cool", state.cool.toFixed(3));
        img.style.filter =
          `brightness(${state.bright.toFixed(3)}) ` +
          `contrast(${state.contrast.toFixed(3)}) ` +
          `saturate(${state.sat.toFixed(3)}) ` +
          `hue-rotate(${state.hue.toFixed(2)}deg) ` +
          `drop-shadow(0 30px 60px rgba(255,138,0,0.3))`;
      };
      apply();

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        })
        // Phase 1: peak bloom + push warmth as user starts scrolling
        .to(
          state,
          {
            bloom: 1.4,
            warm: 1.25,
            cool: 0.85,
            bright: 0.92,
            contrast: 1.22,
            sat: 1.25,
            hue: -10,
            ease: "sine.inOut",
            onUpdate: apply,
          },
          0,
        )
        // Phase 2: dim bloom, deepen vignette so the image dissolves into the next section
        .to(
          state,
          {
            bloom: 0.25,
            vignette: 1.6,
            warm: 0.4,
            cool: 1.2,
            bright: 0.55,
            contrast: 1.3,
            sat: 0.75,
            hue: 4,
            ease: "power2.in",
            onUpdate: apply,
          },
          ">",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-hero grain">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 ambient-glow" />
      <Particles count={50} />

      {/* Glow orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/20 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left copy */}
        <div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Next-gen automated retail</span>
          </motion.div>

          <h1 className="font-display font-bold tracking-tight text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95]">
            {["Reinventing", "Automated", "Retail."].map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: 60, opacity: 0, filter: "blur(20px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block text-gradient"
              >
                {i === 2 ? (
                  <>
                    Retail<span className="text-primary">.</span>
                  </>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-7 max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            SnackUP machines blend AI-driven inventory, contactless payments and cinematic
            design into the world's most intelligent vending experience.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-medium glow-orange hover:scale-[1.03] transition-transform"
            >
              Get a Machine
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#machine"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-strong text-foreground hover:bg-white/10 transition-colors"
            >
              Explore Technology
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-12 flex items-center gap-6 text-xs text-muted-foreground tracking-widest uppercase"
          >
            <span>— Snack More</span>
            <span className="text-primary">●</span>
            <span>Live More</span>
          </motion.div>
        </div>

        {/* Right machine */}
        <div className="relative h-[60vh] lg:h-[80vh] flex items-center justify-center [perspective:1500px]">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="cine-frame relative w-full max-w-[480px] h-full"
          >
            {/* Bloom halo behind the image */}
            <div className="cine-bloom" />

            {/* Soft floor reflection */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-primary/40 blur-3xl rounded-full" />

            {/* Image with vignette mask + color grading */}
            <div className="relative w-full h-full cine-vignette">
              <img
                src={vendingMachine}
                alt="SnackUP smart vending machine"
                className="cine-img relative w-full h-full object-contain"
                style={{ filter: "brightness(0.85) contrast(1.18) saturate(1.15) hue-rotate(-6deg) drop-shadow(0 30px 60px rgba(255,138,0,0.3))" }}
              />
              {/* Color-grade washes */}
              <div className="cine-grade-warm" />
              <div className="cine-grade-cool" />
            </div>

            {/* Outer stage vignette */}
            <div className="cine-stage-vignette" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.4em] text-muted-foreground"
      >
        <span>SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
