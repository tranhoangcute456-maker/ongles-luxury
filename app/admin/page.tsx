"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ADMIN_CATEGORIES, IMAGE_TAGS, SITE_NAME } from "@/lib/constants";

interface NailEntry { filename: string; title: string; category: string; tags: string[]; uploadedAt: string; }

// ── Spinner ─────────────────────────────────────────────
const Spinner = () => (
  <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid #E6E1DB", borderTopColor: "#A06A78", animation: "spin 0.8s linear infinite" }} />
);

// ── Login ────────────────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw]       = useState("");
  const [err, setErr]     = useState("");
  const [loading, setL]   = useState(false);

  const login = async () => {
    if (!pw) { setErr("Please enter password"); return; }
    setL(true); setErr("");
    try {
      const r = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      const d = await r.json();
      if (d.success) onSuccess();
      else setErr(d.error || "Incorrect password");
    } catch { setErr("Connection error"); }
    setL(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF8F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", borderRadius: 20, padding: "52px 44px", width: "100%", maxWidth: 400, boxShadow: "0 8px 40px rgba(35,33,41,0.1)" }}>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.7rem", fontStyle: "italic", textAlign: "center", color: "#232129", marginBottom: 4 }}>{SITE_NAME}</div>
        <div style={{ textAlign: "center", fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#A06A78", marginBottom: 40 }}>Admin Panel</div>

        {err && <div style={{ padding: "10px 14px", borderRadius: 10, background: "#fde8e8", color: "#c0392b", fontSize: "0.85rem", marginBottom: 16, border: "1px solid #f5c6cb" }}>{err}</div>}

        <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#A06A78", marginBottom: 8 }}>Password</label>
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          placeholder="Enter admin password" autoFocus
          style={{ width: "100%", padding: "11px 16px", border: "1px solid #E6E1DB", borderRadius: 10, fontSize: "0.9rem", fontFamily: "inherit", outline: "none", background: "#FAF8F6", color: "#232129", marginBottom: 18, boxSizing: "border-box" as const }}
        />
        <button onClick={login} disabled={loading}
          style={{ width: "100%", padding: "13px", borderRadius: 999, background: "#232129", color: "#FAF8F6", border: "none", fontSize: "0.9rem", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading ? <><Spinner /> Checking...</> : "Sign In"}
        </button>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [nails, setNails]     = useState<NailEntry[]>([]);
  const [files, setFiles]     = useState<File[]>([]);
  const [prevs, setPrevs]     = useState<string[]>([]);
  const [cat, setCat]         = useState("gel");
  const [title, setTitle]     = useState("Nail Art");
  const [selTags, setSelTags] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging]   = useState(false);
  const [msg, setMsg]             = useState<{ text: string; ok: boolean } | null>(null);
  const [tab, setTab]             = useState<"upload" | "manage">("upload");
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const r = await fetch("/api/nails");
    const d = await r.json();
    if (Array.isArray(d)) setNails(d);
  }, []);

  useEffect(() => { load(); }, [load]);

  const flash = (text: string, ok: boolean) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 4500);
  };

  const addFiles = (fl: FileList | null) => {
    if (!fl) return;
    const valid = Array.from(fl).filter(f => {
      if (!["image/jpeg","image/jpg","image/png","image/webp"].includes(f.type)) { flash(`"${f.name}": invalid format`, false); return false; }
      if (f.size > 5 * 1024 * 1024) { flash(`"${f.name}": exceeds 5MB`, false); return false; }
      return true;
    });
    const next = [...files, ...valid];
    setFiles(next);
    setPrevs(next.map(f => URL.createObjectURL(f)));
  };

  const toggleTag = (t: string) => {
    setSelTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const upload = async () => {
    if (!files.length) { flash("No images selected", false); return; }
    setUploading(true);
    const fd = new FormData();
    files.forEach(f => fd.append("images", f));
    fd.append("category", cat);
    fd.append("title", title);
    fd.append("tags", JSON.stringify(selTags));
    try {
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (d.success) { flash(`✓ ${d.nails.length} image${d.nails.length > 1 ? "s" : ""} uploaded!`, true); setFiles([]); setPrevs([]); load(); }
      else flash(d.error || "Upload failed", false);
    } catch { flash("Connection error", false); }
    setUploading(false);
  };

  const delNail = async (filename: string) => {
    if (!confirm(`Delete "${filename}"?`)) return;
    const r = await fetch(`/api/admin/nails/${encodeURIComponent(filename)}`, { method: "DELETE" });
    if ((await r.json()).success) { flash("Deleted", true); load(); }
  };

  const saveNail = async (nail: NailEntry) => {
    await fetch(`/api/admin/nails/${encodeURIComponent(nail.filename)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: nail.title, category: nail.category, tags: nail.tags }),
    });
    setEditingId(null);
    flash("Saved!", true);
    load();
  };

  const toggleNailTag = (nail: NailEntry, tag: string) => {
    nail.tags = nail.tags?.includes(tag) ? nail.tags.filter(t => t !== tag) : [...(nail.tags || []), tag];
    setNails([...nails]);
  };

  // ── Styles
  const C: Record<string, React.CSSProperties> = {
    card:  { background: "white", borderRadius: 16, padding: 28, marginBottom: 20, boxShadow: "0 2px 16px rgba(35,33,41,0.06)" },
    label: { display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#A06A78", marginBottom: 7 },
    input: { width: "100%", padding: "9px 13px", border: "1px solid #E6E1DB", borderRadius: 9, fontSize: "0.88rem", fontFamily: "inherit", outline: "none", background: "#FAF8F6", color: "#232129", boxSizing: "border-box" as const },
    sel:   { padding: "8px 12px", border: "1px solid #E6E1DB", borderRadius: 9, fontSize: "0.85rem", fontFamily: "inherit", outline: "none", background: "#FAF8F6", color: "#232129" },
    btn:   (bg: string, fg: string): React.CSSProperties => ({ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 999, background: bg, color: fg, border: "none", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s" }),
  };

  const featuredCount = nails.filter(n => n.tags?.includes("featured")).length;
  const popularCount  = nails.filter(n => n.tags?.includes("popular")).length;
  const newCount      = nails.filter(n => n.tags?.includes("new")).length;

  return (
    <div style={{ minHeight: "100vh", background: "#FAF8F6", fontFamily: "'Inter',sans-serif" }}>

      {/* Topbar */}
      <div style={{ background: "white", borderBottom: "1px solid #E6E1DB", padding: "0 28px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.1rem", fontStyle: "italic", color: "#232129" }}>
          {SITE_NAME} <span style={{ fontSize: "0.75rem", color: "#7A7A7A", fontStyle: "normal" }}>/ Admin</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="/" target="_blank" style={{ fontSize: "0.8rem", color: "#7A7A7A", textDecoration: "none" }}>← View Site</a>
          <button onClick={onLogout} style={C.btn("#F3EEE9", "#232129")}>Sign Out</button>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 20px" }}>

        {/* Flash */}
        {msg && (
          <div style={{ padding: "12px 18px", borderRadius: 10, marginBottom: 18, fontSize: "0.88rem", background: msg.ok ? "#edf9ee" : "#fde8e8", color: msg.ok ? "#1e7e34" : "#c0392b", border: `1px solid ${msg.ok ? "#c3e6cb" : "#f5c6cb"}` }}>
            {msg.text}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 22 }}>
          {[
            { label: "Total Images",   value: nails.length },
            { label: "⭐ Featured",   value: featuredCount },
            { label: "🔥 Popular",    value: popularCount },
            { label: "✨ New",        value: newCount },
          ].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 14, padding: "20px 22px", boxShadow: "0 2px 14px rgba(35,33,41,0.05)" }}>
              <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2.2rem", fontWeight: 600, color: "#A06A78", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.72rem", color: "#7A7A7A", marginTop: 6, letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "white", borderRadius: 12, padding: 4, boxShadow: "0 2px 14px rgba(35,33,41,0.05)" }}>
          {(["upload","manage"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, padding: "10px 0", borderRadius: 9, fontSize: "0.85rem", fontWeight: 500, border: "none", cursor: "pointer", background: tab === t ? "#232129" : "transparent", color: tab === t ? "#FAF8F6" : "#7A7A7A", fontFamily: "inherit", transition: "all 0.2s", textTransform: "capitalize" }}>
              {t === "upload" ? "⬆ Upload Images" : "🖼 Manage Gallery"}
            </button>
          ))}
        </div>

        {/* Upload Tab */}
        {tab === "upload" && (
          <div style={C.card}>
            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
              onClick={() => document.getElementById("file-in")?.click()}
              style={{ border: `1.5px dashed ${dragging ? "#A06A78" : "#E6E1DB"}`, borderRadius: 14, padding: "44px 24px", textAlign: "center", cursor: "pointer", background: dragging ? "rgba(160,106,120,0.04)" : "#FAF8F6", marginBottom: 18, transition: "all 0.2s" }}
            >
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#A06A78" strokeWidth="1.5" style={{ margin: "0 auto 12px" }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p style={{ color: "#7A7A7A", fontSize: "0.9rem", marginBottom: 4 }}>Drag & drop or <strong style={{ color: "#A06A78" }}>click to browse</strong></p>
              <p style={{ fontSize: "0.72rem", color: "#B98CA0" }}>JPG · PNG · WEBP · Max 5MB each</p>
              <input id="file-in" type="file" multiple accept=".jpg,.jpeg,.png,.webp" style={{ display: "none" }} onChange={e => addFiles(e.target.files)} />
            </div>

            {/* Previews */}
            {prevs.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(78px,1fr))", gap: 8, marginBottom: 18 }}>
                {prevs.map((src, i) => (
                  <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 10, overflow: "hidden", background: "#F3EEE9" }}>
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button onClick={() => { const nf = files.filter((_, j) => j !== i); setFiles(nf); setPrevs(nf.map(f => URL.createObjectURL(f))); }}
                      style={{ position: "absolute", top: 3, right: 3, width: 20, height: 20, borderRadius: "50%", background: "rgba(35,33,41,0.75)", color: "white", border: "none", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* Fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              <div>
                <label style={C.label}>Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} style={C.input} placeholder="e.g. Bridal Pearl" />
              </div>
              <div>
                <label style={C.label}>Category</label>
                <select value={cat} onChange={e => setCat(e.target.value)} style={{ ...C.sel, width: "100%" }}>
                  {ADMIN_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: 20 }}>
              <label style={C.label}>Tags</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {IMAGE_TAGS.map(t => (
                  <button key={t.value} onClick={() => toggleTag(t.value)}
                    style={{ padding: "7px 16px", borderRadius: 999, fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", border: "1px solid", transition: "all 0.15s", background: selTags.includes(t.value) ? "#232129" : "transparent", color: selTags.includes(t.value) ? "#FAF8F6" : "#7A7A7A", borderColor: selTags.includes(t.value) ? "#232129" : "#E6E1DB" }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={upload} disabled={uploading}
              style={{ ...C.btn("#232129", "#FAF8F6"), opacity: uploading ? 0.6 : 1, padding: "11px 28px" }}>
              {uploading ? <><Spinner /> Uploading...</> : `Upload (${files.length} selected)`}
            </button>
          </div>
        )}

        {/* Manage Tab */}
        {tab === "manage" && (
          <div style={C.card}>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#7A7A7A", marginBottom: 18 }}>
              All Images ({nails.length})
            </div>

            {nails.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0", color: "#7A7A7A", fontSize: "0.88rem" }}>No images yet. Upload some!</div>
            ) : (
              <div>
                {nails.map((nail, i) => {
                  const editing = editingId === nail.filename;
                  return (
                    <div key={nail.filename} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: i < nails.length - 1 ? "1px solid #F3EEE9" : "none", flexWrap: "wrap" }}>
                      {/* Thumb */}
                      <div style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#F3EEE9", position: "relative" }}>
                        <Image src={`/images/nail/${nail.filename}`} alt={nail.title} fill style={{ objectFit: "cover" }} sizes="60px" />
                      </div>

                      {/* Info / Edit */}
                      {editing ? (
                        <div style={{ flex: 1, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                          <input defaultValue={nail.title} onChange={e => nail.title = e.target.value}
                            style={{ ...C.input, width: 150, padding: "6px 10px", fontSize: "0.82rem" }} />
                          <select defaultValue={nail.category} onChange={e => nail.category = e.target.value} style={C.sel}>
                            {ADMIN_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                          </select>
                          {/* Tag toggles */}
                          <div style={{ display: "flex", gap: 5 }}>
                            {IMAGE_TAGS.map(t => (
                              <button key={t.value} onClick={() => toggleNailTag(nail, t.value)}
                                style={{ padding: "5px 10px", borderRadius: 999, fontSize: "0.72rem", cursor: "pointer", fontFamily: "inherit", border: "1px solid", background: nail.tags?.includes(t.value) ? "#232129" : "transparent", color: nail.tags?.includes(t.value) ? "#FAF8F6" : "#7A7A7A", borderColor: nail.tags?.includes(t.value) ? "#232129" : "#E6E1DB" }}>
                                {t.label}
                              </button>
                            ))}
                          </div>
                          <button onClick={() => saveNail(nail)} style={C.btn("#A06A78", "#FAF8F6")}>Save</button>
                          <button onClick={() => setEditingId(null)} style={C.btn("#F3EEE9", "#232129")}>Cancel</button>
                        </div>
                      ) : (
                        <>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "#232129", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nail.title}</div>
                            <div style={{ fontSize: "0.73rem", color: "#7A7A7A", marginTop: 2 }}>
                              {nail.category} · {new Date(nail.uploadedAt).toLocaleDateString("en-CA")}
                            </div>
                            {nail.tags?.length > 0 && (
                              <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                                {nail.tags.map(t => (
                                  <span key={t} style={{ fontSize: "0.68rem", padding: "2px 7px", borderRadius: 999, background: t === "featured" ? "rgba(160,106,120,0.15)" : t === "popular" ? "rgba(212,180,131,0.2)" : "rgba(35,33,41,0.07)", color: t === "featured" ? "#A06A78" : t === "popular" ? "#8a6d30" : "#232129" }}>
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <button onClick={() => setEditingId(nail.filename)} style={C.btn("#F3EEE9", "#232129")}>Edit</button>
                          <button onClick={() => delNail(nail.filename)} style={C.btn("#fde8e8", "#c0392b")}>Delete</button>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Admin Root ─────────────────────────────────────────────
export default function AdminPage() {
  const [status, setStatus] = useState<"loading" | "login" | "dash">("loading");

  useEffect(() => {
    fetch("/api/auth/check").then(r => r.json())
      .then(d => setStatus(d.isAdmin ? "dash" : "login"))
      .catch(() => setStatus("login"));
  }, []);

  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); setStatus("login"); };

  if (status === "loading") return (
    <div style={{ minHeight: "100vh", background: "#FAF8F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner />
    </div>
  );

  return status === "login" ? <LoginForm onSuccess={() => setStatus("dash")} /> : <Dashboard onLogout={logout} />;
}
