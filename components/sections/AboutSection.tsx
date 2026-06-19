"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { STATS, ARTIST_NAME, INSTAGRAM_URL } from "@/lib/constants";

function Counter({ end, duration = 2.2 }: { end: string; duration?: number }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  const num    = parseInt(end.replace(/\D/g, "")) || 0;
  const suffix = end.replace(/[\d]/g, "");

  useEffect(() => {
    if (!inView) return;
    const steps = 70;
    let cur = 0;
    const timer = setInterval(() => {
      cur += num / steps;
      if (cur >= num) { cur = num; clearInterval(timer); }
      setVal(Math.round(cur));
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [inView, num, duration]);

  return <span ref={ref}>{inView ? val : 0}{suffix}</span>;
}

export default function AboutSection() {
  const [imgs, setImgs] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/toi")
      .then(r => r.json())
      .then(d => { if (d.images) setImgs(d.images.slice(0, 6)); });
  }, []);

  return (
    <section id="about" className="py-28 lg:py-40 relative overflow-hidden"
      style={{ background: "#100C14" }}>

      {/* BG decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(232,93,138,0.2), transparent)" }} />
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,93,138,0.05) 0%, transparent 70%)" }} />
        <div className="absolute -right-40 bottom-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,75,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Stats row */}
        <motion.div className="grid grid-cols-3 gap-3 sm:gap-6 mb-24 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} className="text-center p-3 sm:p-6 rounded-xl sm:rounded-2xl"
              style={{
                background: "rgba(28,21,36,0.6)",
                border: "1px solid rgba(232,93,138,0.12)",
              }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}>
              <div className="leading-none mb-2" style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "clamp(2.2rem,4vw,3rem)",
                fontWeight: 700,
                background: "linear-gradient(135deg, #E85D8A, #D4A84B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                <Counter end={s.value} />
              </div>
              <div className="text-[11px] tracking-[2px] uppercase font-medium"
                style={{ color: "rgba(250,240,245,0.45)" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Photo collage */}
          <motion.div className="w-full"
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85 }}>

            {imgs.length > 0 ? (
              <>
                {/* Mobile */}
                <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6"
                  style={{ scrollbarWidth: "none" }}>
                  {imgs.map((src, i) => (
                    <div key={i} className="snap-center shrink-0 w-[80vw] sm:w-[60vw] relative rounded-2xl overflow-hidden shadow-md"
                      style={{ aspectRatio: "4/5", background: "#1C1524" }}>
                      <Image src={`/images/toi/${src}`} alt="About artist" fill className="object-cover" sizes="80vw" />
                    </div>
                  ))}
                </div>

                {/* Desktop collage */}
                <div className="hidden lg:block relative w-full" style={{ height: 580 }}>
                  {/* Large portrait */}
                  <div className="absolute overflow-hidden rounded-3xl shadow-2xl"
                    style={{
                      left: 0, top: 0, width: "56%", height: "80%",
                      background: "#1C1524",
                      boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(232,93,138,0.12)",
                    }}>
                    <Image src={`/images/toi/${imgs[0]}`} alt={ARTIST_NAME} fill className="object-cover" sizes="28vw" />
                    {/* Gradient */}
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(13,10,15,0.4), transparent)" }} />
                  </div>
                  {/* Medium top-right */}
                  {imgs[1] && (
                    <div className="absolute overflow-hidden rounded-2xl shadow-xl"
                      style={{ right: 0, top: "4%", width: "41%", height: "46%", background: "#1C1524" }}>
                      <Image src={`/images/toi/${imgs[1]}`} alt="About" fill className="object-cover" sizes="21vw" />
                    </div>
                  )}
                  {/* Medium bottom-right */}
                  {imgs[2] && (
                    <div className="absolute overflow-hidden rounded-2xl shadow-lg"
                      style={{ right: "5%", bottom: "2%", width: "34%", height: "36%", background: "#1C1524" }}>
                      <Image src={`/images/toi/${imgs[2]}`} alt="About" fill className="object-cover" sizes="17vw" />
                    </div>
                  )}
                  {/* Small bottom-center */}
                  {imgs[3] && (
                    <div className="absolute overflow-hidden rounded-xl shadow-md"
                      style={{ left: "34%", bottom: "5%", width: "26%", height: "24%", background: "#1C1524" }}>
                      <Image src={`/images/toi/${imgs[3]}`} alt="About" fill className="object-cover" sizes="13vw" />
                    </div>
                  )}
                  {/* Decorative rings */}
                  <div className="absolute rounded-full pointer-events-none"
                    style={{ right: -20, top: "38%", width: 90, height: 90, border: "1px solid rgba(232,93,138,0.2)" }} />
                  <div className="absolute rounded-full pointer-events-none"
                    style={{ left: -16, bottom: "10%", width: 60, height: 60, border: "1px solid rgba(212,168,75,0.2)" }} />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 h-full min-h-[300px]">
                {[0,1,2,3].map(i => (
                  <div key={i} className="rounded-2xl skeleton min-h-[150px]" />
                ))}
              </div>
            )}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.15 }}>

            <span className="block text-[10px] tracking-[4px] uppercase mb-6 font-bold"
              style={{ color: "#E85D8A" }}>
              About The Artist
            </span>
            <h2 className="mb-8 leading-[1.12]" style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: "clamp(2rem,3vw,2.75rem)",
              fontStyle: "italic",
              fontWeight: 600,
              background: "linear-gradient(135deg, #FAF0F5, #F28BB0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              The Artist Behind<br />Every Masterpiece
            </h2>

            <div className="space-y-4 mb-8">
              <p className="leading-relaxed" style={{ color: "rgba(250,240,245,0.6)" }}>
                Hi, I'm <strong style={{ color: "#FAF0F5", fontWeight: 600 }}>Celina Nguyen</strong> — a passionate nail artist based in Canada.
                For me, nail design is not just a service, it is a form of art that celebrates your individuality.
              </p>
              <p className="leading-relaxed" style={{ color: "rgba(250,240,245,0.6)" }}>
                Every client who walks through my door has a unique vision. My mission is to listen deeply,
                understand your personality, and translate it into a nail set that feels exclusively yours.
              </p>
              <p className="leading-relaxed" style={{ color: "rgba(250,240,245,0.6)" }}>
                From intricate 3D nail art to elegant bridal designs, I approach each set with the same level of
                care, precision and creative passion — because your nails deserve nothing less than luxury.
              </p>
            </div>

            {/* Specialty tags */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {["Gel Nails","3D Art","Ombré","Bridal Nails","French Tips","Nail Art","Luxury Designs"].map(tag => (
                <span key={tag} className="text-xs px-4 py-1.5 rounded-full font-medium"
                  style={{
                    background: "rgba(232,93,138,0.08)",
                    color: "#E85D8A",
                    border: "1px solid rgba(232,93,138,0.2)",
                  }}>
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:gap-5 group"
              style={{ color: "#E85D8A" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Follow my work on Instagram
              <span className="w-7 h-px inline-block transition-all duration-300 group-hover:w-10"
                style={{ background: "#E85D8A" }} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
