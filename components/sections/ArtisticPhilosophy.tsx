"use client";
import { motion } from "framer-motion";
import { PHILOSOPHY } from "@/lib/constants";

export default function ArtisticPhilosophy() {
  return (
    <section className="py-28 lg:py-40 relative overflow-hidden" style={{ background: "#232129" }}>

      {/* Decorative background element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,180,131,0.3), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,180,131,0.3), transparent)" }} />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
          style={{ background: "#A06A78" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Section label */}
        <motion.div className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="block text-[11px] tracking-[4px] uppercase mb-8 font-medium" style={{ color: "#D4B483" }}>
            Artistic Philosophy
          </span>

          {/* Large quote */}
          <blockquote>
            <div className="text-6xl leading-none mb-4 select-none" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color: "rgba(212,180,131,0.3)" }}>"</div>
            <p className="max-w-3xl mx-auto leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#FAF8F6",
                lineHeight: 1.35,
              }}>
              {PHILOSOPHY.quote}
            </p>
          </blockquote>
        </motion.div>

        {/* Paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          {PHILOSOPHY.paragraphs.map((p, i) => (
            <motion.p key={i} className="leading-relaxed text-[15px]"
              style={{ color: "rgba(250,248,246,0.55)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}>
              {p}
            </motion.p>
          ))}
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {PHILOSOPHY.values.map((v, i) => (
            <motion.div
              key={v.title}
              className="p-6 rounded-2xl"
              style={{ background: "rgba(250,248,246,0.04)", border: "1px solid rgba(230,225,219,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ background: "rgba(250,248,246,0.07)" }}
            >
              <div className="text-2xl mb-4 leading-none" style={{ color: "#D4B483" }}>{v.icon}</div>
              <div className="text-sm font-semibold mb-2 tracking-wide" style={{ color: "#FAF8F6" }}>{v.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: "rgba(250,248,246,0.45)" }}>{v.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
