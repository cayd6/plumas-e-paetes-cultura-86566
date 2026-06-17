/**
 * Lightweight CTA / conversion tracking.
 * Pushes events to window.dataLayer (GA4 / GTM-compatible).
 *
 * Naming convention (standardized):
 *   - event name: "cta_click" (single canonical event for all CTAs)
 *   - cta_id:     snake_case, "{surface}_{action}" e.g. "home_hero_primary",
 *                 "memoria_contribute", "partnership_main", "press_asset_download"
 *   - cta_label:  human-readable label shown on the button
 *   - destination: outbound URL or internal route
 *   - category:    one of CTA_CATEGORIES (home | memoria | press | partnership | navigation | external)
 *
 * Safe no-op when no analytics is wired.
 */

type Primitive = string | number | boolean | undefined;
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

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  const data = {
    event,
    timestamp: new Date().toISOString(),
    page_path: window.location.pathname,
    page_lang: document.documentElement.lang || "pt-BR",
    ...payload,
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
}

export function trackCTA(
  cta_id: string,
  cta_label: string,
  destination?: string,
  extra: TrackPayload & { category?: CtaCategory } = {}
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
