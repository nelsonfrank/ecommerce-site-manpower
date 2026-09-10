export type CurrencyCode = "USD" | "TZS" | "EUR" | "KES";

const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  USD: "en-US",
  TZS: "en-TZ",
  EUR: "de-DE",
  KES: "en-KE",
};

/**
 * Format amounts stored as integer cents into localized currency strings.
 */
export function formatMoney(
  cents: number,
  currency: CurrencyCode = "USD"
): string {
  const locale = CURRENCY_LOCALES[currency] || "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}

/**
 * Utility for combining CSS class names.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
