"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_URL, MESSENGER_URL, INSTAGRAM_URL } from "@/lib/constants";

const BTNS = [
  {
    href: PHONE_URL, label: "Call Now", bg: "linear-gradient(135deg, #E85D8A, #C4436E)", target: undefined,
    shadow: "0 6px 20px rgba(232,93,138,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
  {
    href: MESSENGER_URL, label: "Facebook", bg: "#1877F2", target: "_blank",
    shadow: "0 6px 20px rgba(24,119,242,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
        <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.24.59l-.28 2.09c-.04.34.3.59.62.46l2.68-1.12c.2-.08.43-.08.63.01.93.35 1.93.53 2.97.53 5.64 0 10-4.13 10-9.73C22 6.13 17.64 2 12 2z"/>
      </svg>
    ),
  },
  {
    href: INSTAGRAM_URL, label: "Instagram", bg: "linear-gradient(135deg, #F56040, #E1306C, #833AB4)", target: "_blank",
    shadow: "0 6px 20px rgba(225,48,108,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="19" height="19">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none"/>
      </svg>
    ),
  },
];

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 1200); return () => clearTimeout(t); }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-5 z-50 flex flex-col gap-3"
          style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {BTNS.map((btn, i) => (
            <motion.div
              key={btn.label}
              className="relative group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Tooltip */}
              <span className="absolute right-[66px] lg:right-[58px] top-1/2 -translate-y-1/2 text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                style={{ background: "rgba(13,10,15,0.9)", color: "#FAF0F5", border: "1px solid rgba(232,93,138,0.2)", backdropFilter: "blur(8px)" }}>
                {btn.label}
              </span>
              <a
                href={btn.href}
                target={btn.target}
                rel={btn.target ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center w-14 h-14 lg:w-12 lg:h-12 rounded-full transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                style={{ background: btn.bg, boxShadow: btn.shadow }}
                aria-label={btn.label}
              >
                {btn.icon}
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
