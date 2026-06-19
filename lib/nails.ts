import fs from "fs";
import path from "path";

export interface NailEntry {
  filename: string;
  title: string;
  category: string;
  tags: string[];          // "featured" | "popular" | "new"
  uploadedAt: string;
}

const DATA_DIR   = path.join(process.cwd(), "data");
const NAILS_JSON = path.join(DATA_DIR, "nails.json");
const NAIL_DIR   = path.join(process.cwd(), "public", "images", "nail");

// Ensure dirs exist
[DATA_DIR, NAIL_DIR].forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

/** Auto-init nails.json from existing files if empty/missing */
export function initNailsJson(): void {
  const exists   = fs.existsSync(NAILS_JSON);
  const raw      = exists ? fs.readFileSync(NAILS_JSON, "utf-8").trim() : "";
  const isEmpty  = !raw || raw === "[]";

  if (!isEmpty) return; // already populated

  const files = fs.readdirSync(NAIL_DIR).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  const nails: NailEntry[] = files.map((f, i) => ({
    filename:   f,
    title:      "Nail Art",
    category:   "nailart",
    tags:       i < 8 ? ["featured"] : [],   // first 8 are featured
    uploadedAt: fs.statSync(path.join(NAIL_DIR, f)).mtime.toISOString(),
  }));

  fs.writeFileSync(NAILS_JSON, JSON.stringify(nails, null, 2), "utf-8");
}

/** Read all nails — newest first */
export function readNails(): NailEntry[] {
  if (!fs.existsSync(NAILS_JSON)) return [];
  try {
    const list: NailEntry[] = JSON.parse(fs.readFileSync(NAILS_JSON, "utf-8"));
    return list.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  } catch { return []; }
}

/** Read featured nails for homepage */
export function readFeatured(limit = 8): NailEntry[] {
  return readNails()
    .filter((n) => n.tags?.includes("featured"))
    .slice(0, limit);
}

/** Add nail */
export function addNail(entry: NailEntry): void {
  const list = readRaw();
  list.push(entry);
  write(list);
}

/** Delete nail */
export function deleteNail(filename: string): void {
  const list = readRaw().filter((n) => n.filename !== filename);
  write(list);
  const fp = path.join(NAIL_DIR, filename);
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
}

/** Update nail metadata */
export function updateNail(
  filename: string,
  data: Partial<Pick<NailEntry, "title" | "category" | "tags">>
): void {
  const list = readRaw();
  const nail = list.find((n) => n.filename === filename);
  if (!nail) throw new Error("Not found");
  if (data.title    !== undefined) nail.title    = data.title;
  if (data.category !== undefined) nail.category = data.category;
  if (data.tags     !== undefined) nail.tags     = data.tags;
  write(list);
}

export function getNailDir(): string { return NAIL_DIR; }

// ── private ──────────────────────────────────────────────
function readRaw(): NailEntry[] {
  if (!fs.existsSync(NAILS_JSON)) return [];
  try { return JSON.parse(fs.readFileSync(NAILS_JSON, "utf-8")); }
  catch { return []; }
}

function write(list: NailEntry[]): void {
  fs.writeFileSync(NAILS_JSON, JSON.stringify(list, null, 2), "utf-8");
}
