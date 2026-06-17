/**
 * Minimal RFC 4180-ish CSV parse / serialize for admin bulk operations.
 * No external deps. Handles quoted fields, escaped quotes ("") and newlines inside quotes.
 */

export function parseCSV(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let i = 0;
  let inQuotes = false;
  const len = input.length;

  while (i < len) {
    const c = input[i];

    if (inQuotes) {
      if (c === '"') {
        if (input[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += c; i++; continue;
    }

    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === ",") { row.push(field); field = ""; i++; continue; }
    if (c === "\r") { i++; continue; }
    if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; i++; continue; }
    field += c; i++;
  }

  // flush
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 0 && !(r.length === 1 && r[0] === ""));
}

export interface ParsedCSV {
  headers: string[];
  rows: Record<string, string>[];
}

export function parseCSVToObjects(input: string): ParsedCSV {
  const rows = parseCSV(input);
  if (rows.length === 0) return { headers: [], rows: [] };
  const headers = rows[0].map((h) => h.trim());
  const objects = rows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => { obj[h] = r[idx] ?? ""; });
    return obj;
  });
  return { headers, rows: objects };
}

function escapeField(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = typeof v === "string" ? v : String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function toCSV(rows: Record<string, unknown>[], headers?: string[]): string {
  if (rows.length === 0 && !headers) return "";
  const cols = headers ?? Array.from(rows.reduce((set, r) => {
    Object.keys(r).forEach((k) => set.add(k));
    return set;
  }, new Set<string>()));
  const head = cols.map(escapeField).join(",");
  const body = rows.map((r) => cols.map((c) => escapeField(r[c])).join(",")).join("\n");
  return rows.length === 0 ? head : `${head}\n${body}`;
}

export function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a);
  a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Coerces CSV string values to expected JS types based on a hint map. */
export function coerceRow<T extends Record<string, unknown>>(
  row: Record<string, string>,
  types: Partial<Record<keyof T, "string" | "number" | "boolean">>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, raw] of Object.entries(row)) {
    const t = (types as Record<string, string | undefined>)[k];
    const v = raw?.trim?.() ?? raw;
    if (v === "" || v === undefined || v === null) { out[k] = null; continue; }
    if (t === "number") {
      const n = Number(v);
      out[k] = Number.isFinite(n) ? n : null;
    } else if (t === "boolean") {
      out[k] = /^(true|1|sim|yes)$/i.test(String(v));
    } else {
      out[k] = v;
    }
  }
  return out;
}
