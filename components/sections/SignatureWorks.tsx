"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";

interface NailEntry { filename: string; title: string; category: string; tags: string[]; }

const GRID: { area: string; aspect: string; radius: string }[] = [
  { area: "1/1/3/2", aspect: "3/4",  radius: "20px 4px 4px 20px" },
  { area: "1/2/2/3", aspect: "1/1",  radius: "4px 20px 4px 4px" },
  { area: "2/2/3/3", aspect: "4/3",  radius: "4px 4px 4px 4px"  },
  { area: "1/3/3/4", aspect: "2/3",  radius: "4px 20px 20px 4px" },
  { area: "1/4/2/5", aspect: "3/4",  radius: "4px 4px 4px 4px"  },
  { area: "2/4/3/5", aspect: "1/1",  radius: "4px 4px 20px 4px" },
];

export default function SignatureWorks() {
  const [nails, setNails]       = useState<NailEntry[]>([]);
  const [lightbox, setLightbox] = useState<{ nail: NailEntry; idx: number } | null>(null);

  useEffect(() => {
    fetch("/api/nails/featured")
      .then(r => r.json())
      .then((d: NailEntry[]) => {
        if (Array.isArray(d) && d.length > 0) setNails(d.slice(0, 6));
        else return fetch("/api/nails").then(r => r.json()).then((all: NailEntry[]) => {
          if (Array.isArray(all)) setNails(all.slice(0, 6));
        });
      });
  }, []);

  const open  = (nail: NailEntry, idx: number) => { setLightbox({ nail, idx }); document.body.style.overflow = "hidden"; };
  const close = useCallback(() => { setLightbox(null); document.body.style.overflow = ""; }, []);
  const nav   = useCallback((dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.idx + dir + nails.length) % nails.length;
    setLightbox({ nail: nails[next], idx: next });
  }, [lightbox, nails]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft")  nav(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [close, nav]);

  const getCatLabel = (cat: string) =>
    CATEGORIES.find(c => c.value === cat)?.label ?? cat;

  return (
    <section id="signature" className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#0D0A0F" }}>

      {/* BG accents */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(232,93,138,0.25), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div className="mb-14 flex items-end justify-between flex-wrap gap-4"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div>
            <span className="block text-[10px] tracking-[4px] uppercase mb-4 font-bold"
              style={{ color: "#E85D8A" }}>
              Signature Works
            </span>
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
              Curated Masterpieces
            </h2>
          </div>
          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 text-[13px] font-medium tracking-wide transition-all duration-300 hover:gap-4 group"
            style={{ color: "rgba(250,240,245,0.6)" }}>
            View all works
            <span className="inline-block w-7 h-px transition-all duration-300 group-hover:w-10"
              style={{ background: "rgba(250,240,245,0.3)" }} />
          </button>
        </motion.div>

        {/* Desktop Magazine Grid */}
        {nails.length > 0 && (
          <>
            <div className="hidden lg:grid gap-2.5"
              style={{ gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "270px 270px" }}>
              {nails.map((nail, i) => {
                const g = GRID[i] ?? GRID[0];
                return (
                  <motion.div
                    key={nail.filename}
                    className="relative overflow-hidden cursor-pointer group"
                    style={{ gridArea: g.area, borderRadius: g.radius, background: "#1C1524" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: i * 0.07 }}
                    whileHover={{ scale: 1.015 }}
                    onClick={() => open(nail, i)}
                  >
                    <Image src={`/images/nail/${nail.filename}`} alt={nail.title} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                      sizes="(max-width:1280px) 33vw, 22vw" loading={i < 2 ? "eager" : "lazy"} />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5"
                      style={{ background: "linear-gradient(to top, rgba(13,10,15,0.85) 0%, transparent 55%)" }}>
                      <p className="text-white font-medium text-sm leading-tight"
                        style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: "italic" }}>{nail.title}</p>
                      <p className="text-[11px] mt-1 font-medium" style={{ color: "#D4A84B" }}>{getCatLabel(nail.category)}</p>
                    </div>
                    {/* Tag badges */}
                    {nail.tags?.includes("new") && (
                      <div className="absolute top-3 left-3 text-[9px] tracking-[2px] uppercase px-2.5 py-1 rounded-full"
                        style={{ background: "#E85D8A", color: "#fff" }}>New</div>
                    )}
                    {nail.tags?.includes("popular") && (
                      <div className="absolute top-3 left-3 text-[9px] tracking-[2px] uppercase px-2.5 py-1 rounded-full"
                        style={{ background: "#D4A84B", color: "#0D0A0F" }}>Popular</div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile 2-col grid */}
            <div className="lg:hidden grid grid-cols-2 gap-2.5">
              {nails.slice(0, 6).map((nail, i) => (
                <motion.div
                  key={nail.filename}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group"
                  style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1/1", background: "#1C1524" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => open(nail, i)}
                >
                  <Image src={`/images/nail/${nail.filename}`} alt={nail.title} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" sizes="50vw" />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(13,10,15,0.97)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}>
            <motion.div
              className="relative max-w-2xl w-full mx-6"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}>
              <Image src={`/images/nail/${lightbox.nail.filename}`} alt={lightbox.nail.title}
                width={800} height={1000}
                className="object-contain rounded-3xl mx-auto"
                style={{ maxHeight: "80vh", width: "auto" }} />
              <div className="text-center mt-5">
                <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: "italic", fontSize: "1.25rem", color: "#FAF0F5" }}>{lightbox.nail.title}</p>
                <p className="text-xs mt-1 font-medium tracking-widest uppercase" style={{ color: "#D4A84B" }}>{getCatLabel(lightbox.nail.category)}</p>
              </div>
            </motion.div>
            <button className="fixed top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: "rgba(232,93,138,0.15)", border: "1px solid rgba(232,93,138,0.3)" }} onClick={close}>✕</button>
            <button className="fixed left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: "rgba(250,240,245,0.08)", border: "1px solid rgba(250,240,245,0.1)" }}
              onClick={e => { e.stopPropagation(); nav(-1); }}>‹</button>
            <button className="fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: "rgba(250,240,245,0.08)", border: "1px solid rgba(250,240,245,0.1)" }}
              onClick={e => { e.stopPropagation(); nav(1); }}>›</button>
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 text-xs px-4 py-2 rounded-full"
              style={{ background: "rgba(232,93,138,0.12)", color: "#FAF0F5", border: "1px solid rgba(232,93,138,0.2)" }}>
              {lightbox.idx + 1} / {nails.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
