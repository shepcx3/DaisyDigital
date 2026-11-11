// Backup way to run live statuses: a Google Sheet the girls edit, published to the web as CSV.
// Set NEXT_PUBLIC_STATUS_SHEET_URL to the sheet's "Publish to web → CSV" link. Firebase wins if both are set.
//
// Sheet layout (row 1 = headings, one row per girl; extra columns are ignored):
//   name | status light | status | mood | listening | fav trend
import { presenceLabels, team, type Presence } from "@/content/site";
import { clean, type LiveFields } from "./firebase";

export const sheetUrl = process.env.NEXT_PUBLIC_STATUS_SHEET_URL ?? "";

/** Minimal CSV reader: handles quoted cells, commas and line breaks inside quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const endCell = () => {
    row.push(cell);
    cell = "";
  };
  const endRow = () => {
    endCell();
    rows.push(row);
    row = [];
  };
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") endCell();
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      endRow();
    } else cell += ch;
  }
  if (cell || row.length) endRow();
  return rows;
}

const norm = (s: string) => s.trim().toLowerCase().replace(/[^a-z]/g, "");

// "doom-scrolling", "Doom Scrolling" and "doomScrolling" all mean the same light
const PRESENCE_BY_LABEL = new Map<string, Presence>(
  (Object.entries(presenceLabels) as [Presence, string][]).flatMap(([k, label]) => [[norm(label), k], [norm(k), k]]),
);

const COLUMNS: Record<string, keyof LiveFields> = {
  statuslight: "presence",
  light: "presence",
  status: "status",
  mood: "mood",
  listening: "listening",
  currentlylisteningto: "listening",
  favtrend: "trend",
  trend: "trend",
};

export function readSheet(text: string): Record<string, LiveFields> {
  const [head, ...rows] = parseCsv(text);
  if (!head) return {};
  const cols = head.map((h) => (norm(h) === "name" ? "name" : COLUMNS[norm(h)]));
  const out: Record<string, LiveFields> = {};
  for (const r of rows) {
    const name = norm(r[cols.indexOf("name")] ?? "");
    const m = team.find((x) => norm(x.name) === name || x.slug === name);
    if (!m) continue;
    const raw: Record<string, string> = {};
    cols.forEach((c, i) => {
      if (!c || c === "name") return;
      const v = (r[i] ?? "").trim();
      raw[c] = c === "presence" ? (PRESENCE_BY_LABEL.get(norm(v)) ?? "") : v;
    });
    out[m.slug] = clean(raw); // empty cells keep the built-in text
  }
  return out;
}

export async function fetchSheet(): Promise<Record<string, LiveFields>> {
  const res = await fetch(sheetUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`sheet ${res.status}`);
  return readSheet(await res.text());
}
