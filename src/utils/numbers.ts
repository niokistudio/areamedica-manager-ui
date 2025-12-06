/**
 * Format a number as currency
 *
 * @param amount - Amount to format
 * @param currency - Currency code (default: "VES" for Venezuelan Bolívar)
 * @param locale - Locale to use for formatting (default: "es-VE")
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1234.56)
 * // Returns: "Bs. 1.234,56" (Venezuelan Bolívar)
 *
 * @example
 * formatCurrency(1234.56, "USD", "en-US")
 * // Returns: "$1,234.56"
 */
export function formatCurrency(
  amount: number,
  currency: string = "VES",
  locale: string = "es-VE",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount)
}
