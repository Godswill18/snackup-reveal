import { motion } from "framer-motion";
import { Building2, Dumbbell, GraduationCap, Plane, Stethoscope, Hotel } from "lucide-react";

const LOCATIONS = [
  { icon: Building2, name: "Offices", desc: "Premium break-room experiences." },
  { icon: Dumbbell, name: "Gyms", desc: "Healthy fuel, post-workout." },
  { icon: GraduationCap, name: "Universities", desc: "24/7 student-friendly access." },
  { icon: Plane, name: "Airports", desc: "Travel snacks, on-demand." },
  { icon: Stethoscope, name: "Hospitals", desc: "Reliable around-the-clock service." },
  { icon: Hotel, name: "Hotels", desc: "Elevated guest amenities." },
];

export function Locations() {
  return (
    <section id="locations" className="relative py-16 sm:py-24 md:py-32 lg:py-40 px-5 sm:px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-primary uppercase">Anywhere people gather</span>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl md:text-6xl text-gradient">
            Built for every space.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LOCATIONS.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative glass rounded-2xl p-8 overflow-hidden border border-white/5 hover:border-primary/40 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <l.icon className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-2xl font-semibold">{l.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{l.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
