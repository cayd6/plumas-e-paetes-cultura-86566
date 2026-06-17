/**
 * Lightweight CTA / conversion tracking.
 * Pushes events to window.dataLayer (GA4 / GTM-compatible).
 * Safe no-op when no analytics is wired.
 */

type TrackPayload = Record<string, string | number | boolean | undefined>;

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
  extra: TrackPayload = {}
) {
  trackEvent("cta_click", { cta_id, cta_label, destination, ...extra });
}
