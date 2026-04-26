import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import vendingMachine from "@/assets/vending-machine.png";

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-10 overflow-hidden bg-hero"
    >
      <div className="absolute inset-0 grain" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* animated glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/25 blur-[160px]"
      />

      {/* Reassembling machine */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }}
        whileInView={{ scale: 1, opacity: 0.35, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] md:w-[560px] pointer-events-none"
      >
        <img src={vendingMachine} alt="" className="w-full" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center py-32">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.4em] text-primary uppercase"
        >
          The Future Starts Here
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-gradient"
        >
          The future of <span className="text-gradient-orange">smart vending</span> starts here.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-7 text-lg text-muted-foreground max-w-xl mx-auto"
        >
          Deploy a SnackUP machine in your space and turn every break into a premium experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="mailto:hello@snackup.vending"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-medium glow-orange hover:scale-[1.04] transition-transform"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:sales@snackup.vending"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-strong text-foreground hover:bg-white/10 transition-colors"
          >
            Contact Sales
          </a>
        </motion.div>

        <div className="mt-20 text-[10px] tracking-[0.4em] text-muted-foreground">
          SNACKUP VENDING • SNACK MORE • LIVE MORE
        </div>
      </div>
    </section>
  );
}
