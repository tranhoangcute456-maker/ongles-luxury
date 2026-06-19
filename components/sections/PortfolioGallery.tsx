"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";

interface NailEntry { filename: string; title: string; category: string; tags: string[]; }

export default function PortfolioGallery() {
  const [all, setAll]     = useState<NailEntry[]>([]);
  const [shown, setShown] = useState<NailEntry[]>([]);
  const [cat, setCat]     = useState("all");
  const [lb, setLb]       = useState<{ n: NailEntry; i: number } | null>(null);

  useEffect(() => {
    fetch("/api/nails").then(r => r.json()).then((d: NailEntry[]) => {
      if (Array.isArray(d)) { setAll(d); setShown(d); }
    });
  }, []);

  const filter = (c: string) => {
    setCat(c);
    setShown(c === "all" ? all : all.filter(n => n.category === c));
  };

  const openLb  = (n: NailEntry, i: number) => { setLb({ n, i }); document.body.style.overflow = "hidden"; };
  const closeLb = useCallback(() => { setLb(null); document.body.style.overflow = ""; }, []);
  const navLb   = useCallback((d: 1 | -1) => {
    if (!lb) return;
    const next = (lb.i + d + shown.length) % shown.length;
    setLb({ n: shown[next], i: next });
  }, [lb, shown]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!lb) return;
      if (e.key === "Escape")      closeLb();
      if (e.key === "ArrowRight")  navLb(1);
      if (e.key === "ArrowLeft")   navLb(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lb, closeLb, navLb]);

  const label = (c: string) => CATEGORIES.find(x => x.value === c)?.label ?? c;

  const [colsCount, setColsCount] = useState(4);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) setColsCount(2);
      else if (window.innerWidth < 1024) setColsCount(3);
      else setColsCount(4);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const cols: { nail: NailEntry; originalIndex: number }[][] = Array.from(
    { length: colsCount },
    () => []
  );
  shown.forEach((nail, originalIndex) => {
    cols[originalIndex % colsCount].push({ nail, originalIndex });
  });

  const activeCols = cols.filter(c => c.length > 0);

  return (
    <section id="portfolio" className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#0D0A0F" }}>

      {/* BG decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(232,93,138,0.2), transparent)" }} />
        <div className="absolute -right-40 top-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,93,138,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="block text-[10px] tracking-[4px] uppercase mb-4 font-bold" style={{ color: "#E85D8A" }}>
            Portfolio
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
            The Full Collection
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(250,240,245,0.4)" }}>
            {all.length} designs · Updated regularly
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-10 -mx-4 px-4 scrollbar-none md:flex-wrap md:justify-center md:overflow-visible md:mx-0 md:px-0">
          {CATEGORIES.map(c => (
            <button key={c.value} onClick={() => filter(c.value)}
              className="px-5 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 whitespace-nowrap"
              style={{
                background: cat === c.value
                  ? "linear-gradient(135deg, #E85D8A, #C4436E)"
                  : "rgba(250,240,245,0.05)",
                color: cat === c.value ? "#fff" : "rgba(250,240,245,0.5)",
                border: cat === c.value ? "1px solid transparent" : "1px solid rgba(250,240,245,0.08)",
                boxShadow: cat === c.value ? "0 4px 16px rgba(232,93,138,0.3)" : "none",
              }}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Masonry — centered, no gap on right */}
        <AnimatePresence mode="wait">
          <div className="flex flex-wrap justify-center gap-3 md:gap-5" key={cat}>
            {activeCols.map((col, colIdx) => (
              <div
                key={colIdx}
                className="flex flex-col gap-3 md:gap-5 w-[calc(50%-6px)] sm:w-[calc(50%-10px)] md:w-[calc(33.33%-14px)] lg:w-[calc(25%-15px)] max-w-[370px]"
              >
                {col.map(({ nail, originalIndex }) => (
                  <motion.div
                    key={nail.filename}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="relative overflow-hidden cursor-pointer group"
                      style={{ borderRadius: 10, background: "#1C1524" }}
                      onClick={() => openLb(nail, originalIndex)}
                    >
                      <Image src={`/images/nail/${nail.filename}`} alt={nail.title}
                        width={600} height={800}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                        sizes="(max-width:768px) 50vw,(max-width:1280px) 33vw,25vw"
                      />
                      {/* Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5"
                        style={{ background: "linear-gradient(to top,rgba(13,10,15,0.8) 0%,transparent 55%)", borderRadius: 10 }}>
                        <p className="text-white text-sm font-medium"
                          style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: "italic" }}>{nail.title}</p>
                        <p className="text-[10px] mt-0.5 font-medium tracking-wide" style={{ color: "#D4A84B" }}>{label(nail.category)}</p>
                      </div>
                      {/* Tag badge */}
                      {nail.tags?.includes("new") && (
                        <div className="absolute top-2.5 left-2.5 text-[9px] tracking-[1.5px] uppercase px-2 py-0.5 rounded-full"
                          style={{ background: "#E85D8A", color: "#fff" }}>New</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </AnimatePresence>

        {shown.length === 0 && (
          <div className="text-center py-20 text-sm" style={{ color: "rgba(250,240,245,0.4)" }}>
            No designs in this category yet.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lb && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(13,10,15,0.97)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLb}>
            <motion.div className="relative max-w-2xl w-full mx-6"
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}>
              <Image src={`/images/nail/${lb.n.filename}`} alt={lb.n.title}
                width={900} height={1200}
                className="object-contain rounded-3xl mx-auto"
                style={{ maxHeight: "80vh", width: "auto" }} />
              <div className="text-center mt-5">
                <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: "italic", fontSize: "1.2rem", color: "#FAF0F5" }}>{lb.n.title}</p>
                <p className="text-xs mt-1.5 tracking-widest uppercase" style={{ color: "#D4A84B" }}>{label(lb.n.category)}</p>
              </div>
            </motion.div>
            <button className="fixed top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: "rgba(232,93,138,0.15)", border: "1px solid rgba(232,93,138,0.3)" }} onClick={closeLb}>✕</button>
            <button className="fixed left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: "rgba(250,240,245,0.07)", border: "1px solid rgba(250,240,245,0.1)" }}
              onClick={e => { e.stopPropagation(); navLb(-1); }}>‹</button>
            <button className="fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: "rgba(250,240,245,0.07)", border: "1px solid rgba(250,240,245,0.1)" }}
              onClick={e => { e.stopPropagation(); navLb(1); }}>›</button>
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 text-xs px-4 py-2 rounded-full"
              style={{ background: "rgba(232,93,138,0.1)", color: "#FAF0F5", border: "1px solid rgba(232,93,138,0.2)" }}>
              {lb.i + 1} / {shown.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
