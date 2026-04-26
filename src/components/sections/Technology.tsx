import { motion } from "framer-motion";
import { Brain, CreditCard, Gauge, QrCode, ScanLine, Wifi } from "lucide-react";

const FEATURES = [
  { icon: Brain, title: "AI Inventory", desc: "Predictive restocking algorithms keep shelves perfectly stocked, 24/7." },
  { icon: CreditCard, title: "Contactless Payments", desc: "Tap, scan, or pay-by-phone. Every transaction in under two seconds." },
  { icon: Gauge, title: "Real-time Telemetry", desc: "Live dashboards monitoring sales, temperature and uptime." },
  { icon: QrCode, title: "QR Ordering", desc: "Customers scan, pick, and pay from their own device — no touch needed." },
  { icon: ScanLine, title: "Smart Sensors", desc: "Weight & vision sensors track every product in real time." },
  { icon: Wifi, title: "Always Connected", desc: "Cellular fallback ensures the machine never goes offline." },
];

export function Technology() {
  return (
    <section id="technology" className="relative py-16 sm:py-24 md:py-32 lg:py-40 px-5 sm:px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-10 sm:mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-primary uppercase">Smart Technology</span>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl md:text-6xl text-gradient leading-tight">
            Intelligence built into every layer.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-xl">
            From the silicon to the showcase, SnackUP machines are engineered to think,
            adapt and delight.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative glass-strong rounded-2xl p-7 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
