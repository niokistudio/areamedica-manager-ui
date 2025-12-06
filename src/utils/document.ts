import type { DocumentPrefix } from "@/types/document"

export function decodeDocument(
  document: string,
): [DocumentPrefix | null, string | null] {
  if (!document) {
    return [null, null]
  }
  return [document[0] as DocumentPrefix, document.substring(1)]
}

export function encodeDocument(
  documentPrefix: DocumentPrefix,
  documentNumber: string | number,
): string {
  return `${documentPrefix}${documentNumber}`
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
  const [documentPrefix, documentNumber] = decodeDocument(document)
  if (!documentPrefix || !documentNumber) {
    return ""
  }

  // Convert to string and remove any existing dots or non-numeric characters except digits
  const cleanNumber = documentNumber.toString().replace(/\D/g, "")

  // Use Intl.NumberFormat with Spanish locale to get dot separators
  return `${documentPrefix}-${new Intl.NumberFormat("es-VE").format(Number(cleanNumber))}`
}
