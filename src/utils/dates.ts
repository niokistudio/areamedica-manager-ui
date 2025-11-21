/**
 * Format a date string to a localized format
 *
 * @param dateString - ISO date string to format
 * @param locale - Locale to use for formatting (default: "es-VE")
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 *
 * @example
 * formatDate("2024-01-15T10:30:00Z")
 * // Returns: "15 ene 2024, 10:30"
 *
 * @example
 * formatDate("2024-01-15T10:30:00Z", "en-US")
 * // Returns: "Jan 15, 2024, 10:30 AM"
 */
export function formatDate(
  dateString: string,
  locale: string = "es-VE",
  options?: Intl.DateTimeFormatOptions,
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }

  return new Intl.DateTimeFormat(locale, options ?? defaultOptions).format(
    new Date(dateString),
  )
}
