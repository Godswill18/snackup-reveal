import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/use-theme";
import { scrollToSection } from "@/lib/use-lenis";
import snackupLogo from "@/assets/snackup_logo.webp";
import snackup_Dark from "@/assets/snackup_logo_dark_mode.webp";

const NAV_LINKS = [
  // { href: "#technology", label: "Technology" },
  { href: "#machine", label: "Machine" },
  { href: "#locations", label: "Locations" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
    {/* Tap-away backdrop — dims hero when mobile menu is open */}
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={close}
        />
      )}
    </AnimatePresence>

    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 md:px-10 pt-4 sm:pt-5"
    >
      <div className="mx-auto max-w-7xl glass-strong rounded-2xl px-4 sm:px-5 md:px-7 py-3 flex items-center justify-between">
        {/* Logo — swaps based on active theme */}
        <a href="#" className="flex items-center shrink-0">
          <img
            src={theme === "dark" ? snackup_Dark : snackupLogo}
            alt="SnackUP Vending"
            className="h-10 w-auto transition-opacity duration-300"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(l.href); }}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* <a
            href="#contact"
            className="hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Book a Demo
          </a> */}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto max-w-7xl mt-2 bg-background border border-border/40 rounded-2xl px-5 py-5 flex flex-col gap-1 shadow-2xl"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(l.href); close(); }}
                className="text-base text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-border last:border-0 cursor-pointer"
              >
                {l.label}
              </a>
            ))}
            {/* <a
              href="#contact"
              onClick={close}
              className="mt-3 text-center text-sm font-medium px-4 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Book a Demo
            </a> */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
