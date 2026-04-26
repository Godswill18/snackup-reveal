import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 pt-5"
    >
      <div className="mx-auto max-w-7xl glass-strong rounded-2xl px-5 md:px-7 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="text-foreground">Snack</span>
          <span className="text-primary">UP</span>
          <span className="hidden md:inline text-[10px] tracking-[0.3em] text-muted-foreground ml-1">
            VENDING
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#technology" className="hover:text-foreground transition-colors">Technology</a>
          <a href="#machine" className="hover:text-foreground transition-colors">Machine</a>
          <a href="#locations" className="hover:text-foreground transition-colors">Locations</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="text-xs md:text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Book a Demo
        </a>
      </div>
    </motion.header>
  );
}
