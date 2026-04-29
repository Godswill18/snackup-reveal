import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import heroMachine from "@/assets/burst_snack.webp";
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

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left copy */}
        <div className="text-center lg:text-left">
          {/* <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-5 sm:mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Next-gen automated retail</span>
          </motion.div> */}

          <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95]">
            {["Welcome ", "To", "SnackUP Vending."].map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: 60, opacity: 0, filter: "blur(20px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 1.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block text-gradient"
              >
                {i === 2 ? (
                  <>
                   SnackUP Vending<span className="text-primary">.</span>
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
            className="mt-5 sm:mt-7 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            SnackUP Vending provides modern, fully managed vending solutions designed to keep people fuelled throughout the day. We supply and maintain high-quality vending machines 
            stocked with a wide range of popular snacks and drinks, ensuring convenience wherever it’s needed.
          </motion.p>

          {/* <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-7 sm:mt-9 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-medium glow-orange hover:scale-[1.03] transition-transform text-sm sm:text-base"
            >
              Get a Machine
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#machine"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full glass-strong text-foreground hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              Explore Technology
            </a>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-8 sm:mt-12 flex items-center gap-4 sm:gap-6 text-xs text-muted-foreground tracking-widest uppercase justify-center lg:justify-start"
          >
            <span>— Snack More</span>
            <span className="text-primary">●</span>
            <span>Live More</span>
          </motion.div>
        </div>

        {/* Right machine */}
        <div className="relative flex items-center justify-center perspective-[1500px]">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          >
            <img
              src={heroMachine}
              alt="SnackUP smart vending machine"
              className="w-full h-auto object-contain"
              style={{
                maskImage: "radial-gradient(ellipse 78% 82% at 50% 50%, black 48%, transparent 88%)",
                WebkitMaskImage: "radial-gradient(ellipse 78% 82% at 50% 50%, black 48%, transparent 88%)",
              }}
              loading="eager"
              decoding="async"
            />
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
