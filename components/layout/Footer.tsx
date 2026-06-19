import { SITE_NAME, PHONE, PHONE_URL, ADDRESS, FACEBOOK_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#080508", color: "#FAF0F5", borderTop: "1px solid rgba(232,93,138,0.12)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12"
          style={{ borderBottom: "1px solid rgba(250,240,245,0.06)" }}>

          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontStyle: "italic",
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: 8,
              background: "linear-gradient(135deg, #F28BB0, #D4A84B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {SITE_NAME}
            </div>
            <div style={{ fontSize: "0.72rem", color: "rgba(250,240,245,0.45)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Nail Artist · Canada
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(250,240,245,0.45)", marginTop: 12, maxWidth: 280, lineHeight: 1.7 }}>
              Crafting elegant nail art, one client at a time. Based in Canada.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#E85D8A", marginBottom: 16, fontWeight: 600 }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={PHONE_URL} style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FAF0F5", display: "block" }}
                className="hover:text-[#E85D8A] transition-colors duration-300">
                {PHONE}
              </a>
              <p style={{ fontSize: "0.85rem", color: "rgba(250,240,245,0.45)" }}>{ADDRESS}</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(250,240,245,0.35)" }}>Mon – Sat: 10:00 AM – 8:00 PM</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#E85D8A", marginBottom: 16, fontWeight: 600 }}>Follow Me</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-all duration-300 hover:opacity-80"
                style={{ fontSize: "0.9rem", color: "#FAF0F5" }}>
                <span
                  className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #F56040, #E1306C, #833AB4)",
                    boxShadow: "0 4px 12px rgba(225,48,108,0.3)",
                  }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
                  </svg>
                </span>
                <span>
                  <span style={{ display: "block", fontSize: "0.78rem", color: "rgba(250,240,245,0.5)", marginBottom: 1 }}>Instagram</span>
                  <span style={{ fontWeight: 600 }}>{INSTAGRAM_HANDLE}</span>
                </span>
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-all duration-300 hover:opacity-80"
                style={{ fontSize: "0.9rem", color: "#FAF0F5" }}>
                <span
                  className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "#1877F2",
                    boxShadow: "0 4px 12px rgba(24,119,242,0.3)",
                  }}>
                  <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </span>
                <span>
                  <span style={{ display: "block", fontSize: "0.78rem", color: "rgba(250,240,245,0.5)", marginBottom: 1 }}>Facebook</span>
                  <span style={{ fontWeight: 600 }}>Ongles Luxury</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: "0.78rem", color: "rgba(250,240,245,0.3)" }}>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p style={{ fontSize: "0.78rem", color: "rgba(232,93,138,0.5)" }}>
            Crafted with passion ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
