"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_NAME, PHONE_URL, INSTAGRAM_URL, FACEBOOK_URL } from "@/lib/constants";

const NAV = [
  { href: "#home",      label: "Home" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about",     label: "About" },
  { href: "#reviews",   label: "Reviews" },
  { href: "#contact",   label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(13,10,15,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(232,93,138,0.15)"
            : "1px solid transparent",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => nav("#home")}
            className="flex flex-col leading-none text-left group"
          >
            <span
              className="text-base lg:text-lg font-semibold tracking-wide transition-all duration-300 group-hover:opacity-80"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                color: "#FAF0F5",
              }}
            >
              Ongles Luxury
            </span>
            <span
              className="text-[9px] tracking-[3.5px] uppercase"
              style={{ color: "#E85D8A" }}
            >
              Nail Artist
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.href}
                onClick={() => nav(n.href)}
                className="text-[13px] font-medium tracking-wide transition-all duration-300 relative group"
                style={{ color: "rgba(250,240,245,0.75)" }}
              >
                {n.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "#E85D8A" }}
                />
              </button>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(232,93,138,0.12)",
                border: "1px solid rgba(232,93,138,0.25)",
                color: "#E85D8A",
              }}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            {/* Facebook */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(24,119,242,0.12)",
                border: "1px solid rgba(24,119,242,0.25)",
                color: "#4A90D9",
              }}
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={PHONE_URL}
              className="text-[13px] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.03] hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #E85D8A 0%, #C4436E 100%)",
                color: "#fff",
                boxShadow: "0 4px 18px rgba(232,93,138,0.35)",
              }}
            >
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 flex flex-col gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  background: "#E85D8A",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(4px,4px)"
                    : i === 1 ? "scaleX(0)"
                    : "rotate(-45deg) translate(4px,-4px)"
                    : "none",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "#0D0A0F", paddingTop: 72 }}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* BG glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(232,93,138,0.08) 0%, transparent 60%)" }} />
            <nav className="flex flex-col items-center justify-center flex-1 gap-8 relative z-10">
              {NAV.map((n, i) => (
                <motion.button
                  key={n.href}
                  onClick={() => nav(n.href)}
                  className="text-3xl font-medium italic"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#FAF0F5" }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {n.label}
                </motion.button>
              ))}
              <motion.div
                className="flex items-center gap-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #E85D8A, #C4436E)",
                    color: "#fff",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <InstagramIcon /> Instagram
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2"
                  style={{
                    background: "#1877F2",
                    color: "#fff",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <FacebookIcon /> Facebook
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
