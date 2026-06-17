/**
 * Lightweight CTA / conversion tracking.
 * Pushes events to window.dataLayer (GA4 / GTM-compatible).
 *
 * Naming convention (standardized & enforced):
 *   - event name: "cta_click" (single canonical event for all CTAs)
 *   - cta_id:     snake_case, "{surface}_{action}" e.g. "home_hero_primary",
 *                 "memoria_contribute", "partnership_main", "press_asset_download"
 *   - cta_label:  human-readable label shown on the button
 *   - destination: outbound URL or internal route
 *   - cta_category: one of CTA_CATEGORIES
 *   - page_path, page_lang: auto-injected
 *
 * Debug mode: set `window.__lovableTrackingDebug = true` (or use TrackingQA admin page)
 * to log every event and capture it for inspection.
 *
 * Safe no-op when no analytics is wired.
 */

type Primitive = string | number | boolean | undefined | null;
type TrackPayload = Record<string, Primitive>;

export const CTA_CATEGORIES = [
  "home",
  "memoria",
  "press",
  "partnership",
  "navigation",
  "external",
  "award",
  "magazine",
  "blog",
] as const;
export type CtaCategory = (typeof CTA_CATEGORIES)[number];

export interface CtaClickEvent {
  event: "cta_click";
  timestamp: string;
  page_path: string;
  page_lang: string;
  cta_id: string;
  cta_label: string;
  cta_category: CtaCategory;
  destination?: string | null;
  [extra: string]: unknown;
}

export interface TrackingValidationIssue {
  field: string;
  message: string;
  severity: "error" | "warn";
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    __lovableTrackingDebug?: boolean;
    __lovableTrackingLog?: Array<Record<string, unknown> & { _issues?: TrackingValidationIssue[] }>;
  }
}

const SNAKE_CASE = /^[a-z][a-z0-9_]*$/;

export function validateCtaEvent(e: Partial<CtaClickEvent>): TrackingValidationIssue[] {
  const issues: TrackingValidationIssue[] = [];
  if (!e.cta_id) issues.push({ field: "cta_id", severity: "error", message: "missing" });
  else if (!SNAKE_CASE.test(e.cta_id)) issues.push({ field: "cta_id", severity: "error", message: "must be snake_case" });
  if (!e.cta_label) issues.push({ field: "cta_label", severity: "warn", message: "missing label" });
  if (!e.cta_category || !CTA_CATEGORIES.includes(e.cta_category as CtaCategory)) {
    issues.push({ field: "cta_category", severity: "error", message: `must be one of ${CTA_CATEGORIES.join("|")}` });
  }
  if (!e.page_lang) issues.push({ field: "page_lang", severity: "warn", message: "missing page_lang" });
  return issues;
}

export function trackEvent(event: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  const data: Record<string, unknown> = {
    event,
    timestamp: new Date().toISOString(),
    page_path: window.location.pathname,
    page_lang: document.documentElement.lang || "pt-BR",
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];

  if (event === "cta_click") {
    const issues = validateCtaEvent(data as Partial<CtaClickEvent>);
    if (issues.length) {
      (data as Record<string, unknown>)._issues = issues;
      if (import.meta.env.DEV || window.__lovableTrackingDebug) {
        // eslint-disable-next-line no-console
        console.warn("[tracking] cta_click issues:", issues, data);
      }
    }
  }

  if (window.__lovableTrackingDebug) {
    window.__lovableTrackingLog = window.__lovableTrackingLog || [];
    window.__lovableTrackingLog.push(data);
    // eslint-disable-next-line no-console
    console.info("[tracking]", data);
  }

  window.dataLayer.push(data);
  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
}

export function trackCTA(
  cta_id: string,
  cta_label: string,
  destination?: string,
  extra: TrackPayload & { category?: CtaCategory } = {},
) {
  const { category = "navigation", ...rest } = extra;
  trackEvent("cta_click", {
    cta_id,
    cta_label,
    destination,
    cta_category: category,
    ...rest,
  });
}

/** Enable debug logging (no-op on SSR). */
export function enableTrackingDebug() {
  if (typeof window === "undefined") return;
  window.__lovableTrackingDebug = true;
  window.__lovableTrackingLog = window.__lovableTrackingLog || [];
}
export function disableTrackingDebug() {
  if (typeof window === "undefined") return;
  window.__lovableTrackingDebug = false;
}
export function getTrackingLog() {
  if (typeof window === "undefined") return [];
  return window.__lovableTrackingLog ?? [];
}
export function clearTrackingLog() {
  if (typeof window !== "undefined") window.__lovableTrackingLog = [];
}
