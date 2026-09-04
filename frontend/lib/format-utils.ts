/**
 * Deterministic formatting utilities for RoadGuard AI.
 * Explicitly binds to "en-US" on both Server (Node SSR) and Client (Browser)
 * to prevent hydration mismatches caused by ambient system/browser locales.
 */

export const DETERMINISTIC_LOCALE = "en-US";

/**
 * Format an integer or float with standard US comma grouping (e.g. 140,280).
 */
export function formatNumber(value: number | bigint | undefined | null): string {
  if (value === null || value === undefined || isNaN(Number(value))) return "0";
  return Number(value).toLocaleString(DETERMINISTIC_LOCALE);
}

/**
 * Format miles with standard US comma grouping and suffix (e.g. 140,280 mi).
 */
export function formatMiles(value: number | undefined | null): string {
  return `${formatNumber(value)} mi`;
}

/**
 * Format kilometers with standard US comma grouping and suffix (e.g. 225,720 km).
 */
export function formatKm(value: number | undefined | null): string {
  return `${formatNumber(value)} km`;
}

/**
 * Format USD currency with standard US comma grouping (e.g. $46,000).
 */
export function formatCurrency(value: number | undefined | null): string {
  return `$${formatNumber(value)}`;
}

/**
 * Format timestamp deterministically (e.g. 10:45:30 AM).
 */
export function formatTimeString(date: Date = new Date()): string {
  return date.toLocaleTimeString(DETERMINISTIC_LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
