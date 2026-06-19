"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PHONE, PHONE_URL, ADDRESS, WORKING_HOURS,
  FACEBOOK_URL, MESSENGER_URL, INSTAGRAM_URL,
  INSTAGRAM_HANDLE, MAPS_EMBED_URL, ARTIST_NAME
} from "@/lib/constants";

export default function ContactSection() {
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/toi").then(r => r.json()).then(d => {
      if (d.images?.[0]) setImg(`/images/toi/${d.images[0]}`);
    });
  }, []);

  return (
    <section id="contact" className="py-24 lg:py-40 relative overflow-hidden"
      style={{ background: "#0D0A0F" }}>

      {/* BG decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(232,93,138,0.25), transparent)" }} />
        <div className="absolute -left-40 bottom-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,93,138,0.06) 0%, transparent 70%)" }} />
        <div className="absolute -right-20 top-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,75,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Large heading */}
        <motion.div className="text-center mb-20"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="block text-[10px] tracking-[4px] uppercase mb-5 font-bold" style={{ color: "#E85D8A" }}>
            Book An Appointment
          </span>
          <h2 className="leading-[1.08] max-w-2xl mx-auto" style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(2.2rem,4.5vw,3.8rem)",
            fontStyle: "italic",
            fontWeight: 700,
            background: "linear-gradient(135deg, #FAF0F5 30%, #F28BB0 70%, #D4A84B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Let's Create Your<br />Next Nail Look
          </h2>
          <p className="mt-6 text-base max-w-md mx-auto leading-relaxed" style={{ color: "rgba(250,240,245,0.5)" }}>
            Ready to book? Simply reach out directly via phone, Instagram or Facebook to discuss your design ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>

            {/* Phone — big */}
            <div className="mb-10 pb-10" style={{ borderBottom: "1px solid rgba(232,93,138,0.12)" }}>
              <p className="text-[10px] tracking-[3px] uppercase mb-3 font-bold" style={{ color: "rgba(250,240,245,0.4)" }}>Phone</p>
              <a href={PHONE_URL}
                className="leading-none transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "clamp(2rem,4vw,3.2rem)",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #FAF0F5, #F28BB0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "block",
                }}>
                {PHONE}
              </a>
            </div>

            {/* Details */}
            <div className="space-y-5 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(232,93,138,0.1)", border: "1px solid rgba(232,93,138,0.2)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E85D8A" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[2px] mb-1 font-bold" style={{ color: "rgba(250,240,245,0.35)" }}>Address</p>
                  <p className="font-medium" style={{ color: "#FAF0F5" }}>{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(232,93,138,0.1)", border: "1px solid rgba(232,93,138,0.2)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E85D8A" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[2px] mb-1 font-bold" style={{ color: "rgba(250,240,245,0.35)" }}>Hours</p>
                  <p className="font-medium" style={{ color: "#FAF0F5" }}>{WORKING_HOURS}</p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 mb-12 w-full">

              {/* Phone */}
              <a href={PHONE_URL}
                className="flex items-center justify-center gap-3 w-full px-7 py-4 min-h-[54px] rounded-2xl text-[15px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #E85D8A 0%, #C4436E 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(232,93,138,0.35)",
                }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call Now — {PHONE}
              </a>

              {/* Instagram DM */}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-7 py-4 min-h-[54px] rounded-2xl text-[15px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #F56040, #E1306C, #833AB4)",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(225,48,108,0.3)",
                }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="18" height="18">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none"/>
                </svg>
                Instagram DM — {INSTAGRAM_HANDLE}
              </a>

              {/* Facebook */}
              <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-7 py-4 min-h-[54px] rounded-2xl text-[15px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
                style={{
                  background: "#1877F2",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(24,119,242,0.3)",
                }}>
                <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                  <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.24.59l-.28 2.09c-.04.34.3.59.62.46l2.68-1.12c.2-.08.43-.08.63.01.93.35 1.93.53 2.97.53 5.64 0 10-4.13 10-9.73C22 6.13 17.64 2 12 2z"/>
                </svg>
                Facebook Message
              </a>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl"
              style={{ height: 240, border: "1px solid rgba(232,93,138,0.15)" }}>
              <iframe
                src={MAPS_EMBED_URL}
                width="100%" height="240"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(200deg) saturate(0.4) brightness(0.7)" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map — ${ADDRESS}`}
              />
            </div>
          </motion.div>

          {/* Right: Artist image card */}
          <motion.div className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>

            {/* Image */}
            <div className="relative overflow-hidden"
              style={{
                borderRadius: 28,
                aspectRatio: "3/4",
                maxHeight: 520,
                background: "#1C1524",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 50px rgba(232,93,138,0.1)",
              }}>
              {img ? (
                <Image src={img} alt={ARTIST_NAME} fill className="object-cover" sizes="(max-width:1024px) 90vw,44vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ color: "rgba(250,240,245,0.2)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="56" height="56">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-7"
                style={{ background: "linear-gradient(to top, rgba(13,10,15,0.9) 0%, transparent 100%)" }}>
                <p style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontStyle: "italic",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "#FAF0F5",
                }}>{ARTIST_NAME}</p>
                <p className="text-xs mt-1.5 tracking-widest" style={{ color: "#D4A84B" }}>
                  Nail Artist · {INSTAGRAM_HANDLE}
                </p>
                <div className="flex gap-3 mt-4">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:opacity-80"
                    style={{ background: "rgba(232,93,138,0.2)", color: "#F28BB0", border: "1px solid rgba(232,93,138,0.3)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                    Instagram
                  </a>
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:opacity-80"
                    style={{ background: "rgba(24,119,242,0.2)", color: "#79B8F3", border: "1px solid rgba(24,119,242,0.3)" }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Note card */}
            <div className="p-6 rounded-2xl"
              style={{
                background: "rgba(28,21,36,0.8)",
                border: "1px solid rgba(232,93,138,0.12)",
              }}>
              <div className="flex gap-2 mb-3">
                <span style={{ color: "#E85D8A" }}>✦</span>
                <p className="text-sm font-semibold" style={{ color: "#FAF0F5" }}>No booking form needed</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(250,240,245,0.5)" }}>
                Simply contact me directly via <strong style={{ color: "#E85D8A" }}>phone</strong>, <strong style={{ color: "#E85D8A" }}>Instagram</strong>, or <strong style={{ color: "#4A90D9" }}>Facebook</strong> to discuss your design ideas and schedule your appointment. I look forward to creating something beautiful for you!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
