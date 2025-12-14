/**
 * Merge separate date and time strings into a single ISO 8601 date-time string
 *
 * @param date - Date string in YYYY-MM-DD format
 * @param time - Time string in HH:mm:ss format (optional)
 * @returns ISO 8601 date-time string
 *
 * @example
 * mergeDateAndTime("2024-01-15", "10:30:00")
 * // Returns: "2024-01-15T10:30:00"
 *
 * @example
 * mergeDateAndTime("2024-01-15")
 * // Returns: "2024-01-15T00:00:00"
 */
export function mergeDateAndTime(date: string, time?: string): string {
  const timeComponent = time || "00:00:00"
  return `${date}T${timeComponent}`
}

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
  //  TODO: Edit screen can only apply to pending transactions, success transactions should not be updated
  //  TODO: Remove functionality does not update cache
  //  TODO: Bulk download and bulk delete
  //  TODO: Filter transactions by date
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
