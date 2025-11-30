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

/**
 * Format a document ID with a prefix and dot-separated number
 *
 * @param document - Document ID string with prefix (e.g., "V12345678", "E12345678")
 * @returns Formatted document ID with prefix and dots as thousand separators, or empty string if invalid
 *
 * @example
 * formatDocument("V12345678")
 * // Returns: "V-12.345.678"
 *
 * @example
 * formatDocument("E1234567")
 * // Returns: "E-1.234.567"
 *
 * @example
 * formatDocument("J123456")
 * // Returns: "J-123.456"
 *
 * @example
 * formatDocument("")
 * // Returns: ""
 */
export function formatDocument(document: string): string {
  if (!document) {
    return ""
  }
  const documentType = document[0]
  const documentNumber = document.substring(1)

  if (!documentType || !documentNumber) {
    return ""
  }

  // Convert to string and remove any existing dots or non-numeric characters except digits
  const cleanNumber = documentNumber.toString().replace(/\D/g, "")

  // Use Intl.NumberFormat with Spanish locale to get dot separators
  return `${documentType}-${new Intl.NumberFormat("es-VE").format(Number(cleanNumber))}`
}
