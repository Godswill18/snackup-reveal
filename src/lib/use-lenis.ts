import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let _lenis: Lenis | null = null;

export function scrollToSection(href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  if (_lenis) {
    _lenis.scrollTo(target as HTMLElement, { offset: -90, duration: 1.4 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    _lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      _lenis = null;
    };
  }, []);
}
