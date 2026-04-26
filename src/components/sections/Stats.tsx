import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 99.9, suffix: "%", label: "Uptime guarantee" },
  { value: 24, suffix: "/7", label: "Automated sales" },
  { value: 100, suffix: "%", label: "Smart inventory tracking" },
  { value: 40, suffix: "%", label: "More energy efficient" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  const display = to % 1 === 0 ? Math.round(val) : val.toFixed(1);
  return (
    <span ref={ref}>
      {display}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-primary/15 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center font-display font-bold text-4xl md:text-6xl text-gradient mb-20"
        >
          The numbers speak.
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-bold text-6xl md:text-7xl text-gradient leading-none">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground tracking-wide">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
