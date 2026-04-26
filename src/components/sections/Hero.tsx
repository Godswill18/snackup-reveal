import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import vendingMachine from "@/assets/vending-machine.png";
import { Particles } from "./Particles";

export function Hero() {
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
