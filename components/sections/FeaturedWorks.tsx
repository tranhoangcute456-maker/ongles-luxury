"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface NailEntry { filename: string; title: string; category: string; uploadedAt: string; }

const LAYOUTS = [
  { gridArea: "1/1/3/2", aspect: "2/3" },  // tall left
  { gridArea: "1/2/2/3", aspect: "1/1" },  // square top-mid
  { gridArea: "1/3/2/4", aspect: "3/4" },  // portrait top-right
  { gridArea: "2/2/3/3", aspect: "4/3" },  // landscape bottom-mid
  { gridArea: "2/3/3/4", aspect: "1/1" },  // square bottom-right
  { gridArea: "1/4/2/5", aspect: "3/4" },  // portrait far right
  { gridArea: "2/4/3/5", aspect: "1/1" },  // square far right bottom
];

export default function FeaturedWorks() {
  const [nails, setNails] = useState<NailEntry[]>([]);
  const [selected, setSelected] = useState<NailEntry | null>(null);

  useEffect(() => {
    fetch("/api/nails")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) ? setNails(data.slice(0, 7)) : [])
      .catch(() => {});
  }, []);

  return (
    <section id="featured" className="py-24 lg:py-32" style={{ background: "#FAF8F6" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-xs tracking-[3px] uppercase mb-4 font-medium" style={{ color: "#B76E79" }}>
            Featured Works
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl italic font-medium" style={{ color: "#2D2A32" }}>
            Những tác phẩm<br />nổi bật
          </h2>
        </motion.div>

        {/* Desktop: magazine grid */}
        {nails.length > 0 && (
          <>
            <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "auto auto" }}>
              {nails.map((nail, i) => {
                const layout = LAYOUTS[i] || LAYOUTS[LAYOUTS.length - 1];
                return (
                  <motion.div
                    key={nail.filename}
                    className="relative overflow-hidden cursor-pointer group"
                    onClick={() => setSelected(nail)}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    whileHover={{ scale: 1.015 }}
                    style={{ gridArea: layout.gridArea, borderRadius: 16 }}
                  >
                    <div
                      className="w-full overflow-hidden"
                      style={{ aspectRatio: layout.aspect, borderRadius: 16, background: "#F3EEE9" }}
                    >
                      <Image
                        src={`/images/nail/${nail.filename}`}
                        alt={nail.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:1280px) 33vw, 25vw"
                        loading="lazy"
                      />
                    </div>
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                      style={{ background: "linear-gradient(to top, rgba(45,42,50,0.7) 0%, transparent 60%)", borderRadius: 16 }}
                    >
                      <div>
                        <div className="text-white font-medium text-sm">{nail.title}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#D4B483" }}>{nail.category}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile: simple 2-col */}
            <div className="lg:hidden grid grid-cols-2 gap-3">
              {nails.slice(0,6).map((nail, i) => (
                <motion.div
                  key={nail.filename}
                  className="relative overflow-hidden rounded-xl cursor-pointer group"
                  style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1/1", background: "#F3EEE9" }}
                  onClick={() => setSelected(nail)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Image
                    src={`/images/nail/${nail.filename}`}
                    alt={nail.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="50vw"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Lightbox */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(45,42,50,0.92)" }}
            onClick={() => setSelected(null)}
          >
            <div className="relative max-w-2xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={`/images/nail/${selected.filename}`}
                alt={selected.title}
                width={800}
                height={1000}
                className="object-contain rounded-xl max-h-[80vh]"
                style={{ maxHeight: "80vh", width: "auto" }}
              />
              <div className="mt-4 text-center">
                <div className="font-playfair italic text-xl" style={{ color: "#FAF8F6" }}>{selected.title}</div>
                <div className="text-sm mt-1" style={{ color: "#D4B483" }}>{selected.category}</div>
              </div>
              <button
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg"
                style={{ background: "rgba(250,248,246,0.15)" }}
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* View all link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-3 text-sm font-medium tracking-wide transition-opacity hover:opacity-60"
            style={{ color: "#2D2A32" }}
          >
            Xem toàn bộ portfolio
            <span className="inline-block w-8 h-px" style={{ background: "#2D2A32" }} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
