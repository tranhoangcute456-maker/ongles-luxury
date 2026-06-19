"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PHONE, PHONE_URL, INSTAGRAM_URL, FACEBOOK_URL } from "@/lib/constants";

const FV = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function HeroSection() {
  const [nailImgs, setNailImgs] = useState<string[]>([]);
  const [portrait, setPortrait] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/nails/featured")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setNailImgs(d.map((n: any) => `/images/nail/${n.filename}`)); });

    fetch("/api/toi")
      .then(r => r.json())
      .then(d => { if (d.images?.[0]) setPortrait(`/images/toi/${d.images[0]}`); });
  }, []);

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: "#0D0A0F" }}>

      {/* ── Decorative BG ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-right rose glow */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,93,138,0.12) 0%, transparent 70%)" }} />
        {/* Bottom-left gold glow */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,75,0.07) 0%, transparent 70%)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(rgba(250,240,245,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full pt-28 pb-16 lg:py-0 lg:min-h-[100dvh] flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center w-full">

          {/* ── TEXT CONTENT ── */}
          <div className="w-full lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">

            <motion.span
              className="inline-flex items-center gap-2 text-[10px] tracking-[4px] uppercase mb-7 font-bold px-4 py-1.5 rounded-full"
              style={{
                color: "#E85D8A",
                background: "rgba(232,93,138,0.1)",
                border: "1px solid rgba(232,93,138,0.2)",
              }}
              variants={FV} custom={0} initial="hidden" animate="show"
            >
              <span>✦</span> Vietnamese Nail Artist · Canada
            </motion.span>

            <motion.h1
              className="leading-[1.12] mb-6 w-full"
              variants={FV} custom={1} initial="hidden" animate="show"
            >
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
                fontStyle: "italic",
                fontWeight: 700,
                background: "linear-gradient(135deg, #FAF0F5 30%, #F28BB0 70%, #D4A84B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}>Celina Nguyen</span>
              <span className="block mt-2" style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
                fontWeight: 300,
                color: "rgba(250,240,245,0.5)",
                letterSpacing: "0.02em",
              }}>
                Luxury Nail Art · From Vietnam
              </span>
            </motion.h1>

            <motion.div
              className="text-[15px] lg:text-[16px] leading-[1.85] mb-9 space-y-3 max-w-[480px]"
              style={{ color: "rgba(250,240,245,0.6)" }}
              variants={FV} custom={2} initial="hidden" animate="show"
            >
              <p><strong style={{ color: "#FAF0F5", fontWeight: 500 }}>Hi, I'm Celina Nguyen.</strong></p>
              <p>Originally from Vietnam and now based in Canada, I specialize in luxury nail designs that blend creativity, precision, and personal style.</p>
              <p>Every client receives a unique design tailored to their personality and occasion.</p>
            </motion.div>

            {/* Badges */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-10"
              variants={FV} custom={3} initial="hidden" animate="show"
            >
              {[
                { label: "3+ Years Exp", icon: "✦", color: "#E85D8A" },
                { label: "500+ Clients", icon: "❋", color: "#D4A84B" },
                { label: "📍 Canada", icon: "", color: "transparent" },
              ].map((b) => (
                <div key={b.label}
                  className="px-4 py-2 rounded-full text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5"
                  style={{
                    background: "rgba(250,240,245,0.05)",
                    border: "1px solid rgba(250,240,245,0.1)",
                    color: "rgba(250,240,245,0.7)",
                  }}>
                  {b.icon && <span style={{ color: b.color }}>{b.icon}</span>}
                  {b.label}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap w-full gap-3 mb-8"
              variants={FV} custom={4} initial="hidden" animate="show"
            >
              <a href={PHONE_URL}
                className="flex items-center justify-center px-8 py-3.5 min-h-[50px] rounded-full text-[14px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-xl whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #E85D8A 0%, #C4436E 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 28px rgba(232,93,138,0.4)",
                }}>
                Book Appointment
              </a>
              <a href={PHONE_URL}
                className="flex items-center justify-center px-8 py-3.5 min-h-[50px] rounded-full text-[14px] font-medium tracking-wide transition-all duration-300 hover:scale-[1.03] whitespace-nowrap"
                style={{
                  border: "1px solid rgba(250,240,245,0.15)",
                  color: "rgba(250,240,245,0.8)",
                  background: "rgba(250,240,245,0.04)",
                  backdropFilter: "blur(8px)",
                }}>
                Call {PHONE}
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start w-full"
              variants={FV} custom={5} initial="hidden" animate="show"
            >
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[12px] uppercase tracking-[2px] font-semibold transition-all duration-300 hover:opacity-80"
                style={{ color: "#E85D8A" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                Instagram
              </a>
              <span style={{ color: "rgba(250,240,245,0.15)" }}>·</span>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[12px] uppercase tracking-[2px] font-semibold transition-all duration-300 hover:opacity-80"
                style={{ color: "#4A90D9" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
            </motion.div>
          </div>

          {/* ── IMAGE COMPOSITION ── */}
          <div className="w-full lg:col-span-7 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <div className="relative w-[85%] sm:w-[70%] lg:w-[80%] aspect-[3/4]">

              {/* Main image */}
              <motion.div
                className="w-full h-full overflow-hidden"
                style={{
                  borderRadius: "2.5rem",
                  boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7), 0 0 60px rgba(232,93,138,0.2)",
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="relative w-full h-full" style={{ background: "#1C1524" }}>
                  {nailImgs[0] && (
                    <Image src={nailImgs[0]} alt="Celina Nguyen Featured Nail Art" fill
                      className="object-cover" priority sizes="(max-width:1024px) 85vw, 45vw" />
                  )}
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3"
                    style={{ background: "linear-gradient(to top, rgba(13,10,15,0.5), transparent)" }} />
                </div>
              </motion.div>

              {/* Supporting bottom-left circle */}
              <motion.div
                className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-12 lg:-left-14 w-[44%] aspect-square rounded-full overflow-hidden"
                style={{
                  border: "6px solid #0D0A0F",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6), 0 0 30px rgba(212,168,75,0.15)",
                }}
                initial={{ opacity: 0, x: -30, rotate: -10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.45 }}
              >
                <div className="relative w-full h-full" style={{ background: "#1C1524" }}>
                  {nailImgs[1] && (
                    <Image src={nailImgs[1]} alt="Detail Nail Art" fill className="object-cover"
                      priority sizes="(max-width:1024px) 50vw, 25vw" />
                  )}
                </div>
              </motion.div>

              {/* Portrait top-right */}
              {portrait && (
                <motion.div
                  className="absolute -top-4 -right-3 sm:-top-8 sm:-right-10 lg:-right-12 w-[36%] aspect-[4/5] overflow-hidden"
                  style={{
                    borderRadius: "1.8rem",
                    border: "5px solid #0D0A0F",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6), 0 0 30px rgba(232,93,138,0.15)",
                    transform: "rotate(3deg)",
                  }}
                  initial={{ opacity: 0, y: -30, rotate: 10 }}
                  animate={{ opacity: 1, y: 0, rotate: 3 }}
                  transition={{ duration: 1, delay: 0.55 }}
                >
                  <div className="relative w-full h-full" style={{ background: "#1C1524" }}>
                    <Image src={portrait} alt="Celina Nguyen Portrait" fill className="object-cover"
                      priority sizes="(max-width:1024px) 40vw, 20vw" />
                  </div>
                </motion.div>
              )}

              {/* Gold ring accent */}
              <motion.div
                className="absolute top-[42%] -left-14 w-14 h-14 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(212,168,75,0.35)" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
              <motion.div
                className="absolute top-[45%] -left-8 w-6 h-6 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(232,93,138,0.3)" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.0 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(232,93,138,0.3), transparent)" }} />
    </section>
  );
}
