"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" fill="#D4A84B" width="13" height="13">
          <path d="M6 1l1.3 2.7L10 4.3l-2 1.9.5 2.8L6 7.7l-2.5 1.3.5-2.8-2-1.9 2.7-.6z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [idx, setIdx]       = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(null!);

  const run = () => {
    clearInterval(timer.current);
    if (!paused) timer.current = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
  };

  useEffect(() => { run(); return () => clearInterval(timer.current); }, [paused]);

  const go = (i: number) => { setIdx(i); setPaused(true); setTimeout(() => setPaused(false), 10000); };

  const t = TESTIMONIALS[idx];

  return (
    <section id="reviews" className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#100C14" }}>

      {/* BG decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(232,93,138,0.2), transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,93,138,0.04) 0%, transparent 70%)" }} />
        {/* Large decorative quote */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[14rem] leading-none select-none opacity-[0.025]"
          style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color: "#E85D8A" }}>
          "
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">

        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="block text-[10px] tracking-[4px] uppercase mb-4 font-bold" style={{ color: "#E85D8A" }}>Client Love</span>
          <h2 className="leading-[1.1]" style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(2rem,3.5vw,3rem)",
            fontStyle: "italic",
            fontWeight: 600,
            background: "linear-gradient(135deg, #FAF0F5, #F28BB0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            What Clients Say
          </h2>
        </motion.div>

        {/* Card */}
        <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              className="text-center w-full max-w-2xl mx-auto cursor-grab active:cursor-grabbing touch-pan-y p-10 rounded-3xl"
              style={{
                background: "rgba(28,21,36,0.7)",
                border: "1px solid rgba(232,93,138,0.12)",
                backdropFilter: "blur(20px)",
              }}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -40) go((idx + 1) % TESTIMONIALS.length);
                else if (offset.x > 40) go((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
              }}
            >
              <div className="flex justify-center mb-5">
                <Stars n={t.rating} />
              </div>

              <blockquote className="leading-relaxed mb-8 text-lg lg:text-xl px-2"
                style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", color: "rgba(250,240,245,0.85)" }}>
                "{t.content}"
              </blockquote>

              <div>
                <div className="font-bold text-sm mb-1" style={{ color: "#FAF0F5" }}>{t.name}</div>
                <div className="text-xs tracking-wide" style={{ color: "#E85D8A" }}>{t.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === i ? 28 : 8,
                height: 8,
                background: idx === i
                  ? "linear-gradient(135deg, #E85D8A, #D4A84B)"
                  : "rgba(250,240,245,0.12)",
              }}
              aria-label={`Review ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
