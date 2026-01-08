import type { PhonePrefix } from "@/types/phone"

export function decodePhone(
  phone: string,
): [PhonePrefix | null, string | null] {
  if (!phone || phone.length < 10) {
    return [null, null]
  }
  // Remove country code "58" (first 2 digits)
  const phoneWithoutCountryCode = phone.startsWith("0")
    ? phone.substring(1)
    : phone.substring(2)
  // Extract prefix (first 3 digits like "412") and add leading "0"
  const prefix = `0${phoneWithoutCountryCode.substring(0, 3)}`
  // Extract phone number (last 7 digits)
  const phoneNumber = phoneWithoutCountryCode.substring(3)

  return [prefix as PhonePrefix, phoneNumber]
}

export function encodePhone(
  phonePrefix: PhonePrefix,
  phoneNumber: string | number,
): string {
  // Remove the leading "0" from prefix (e.g., "0412" becomes "412")
  const prefixWithoutZero = phonePrefix.substring(1)
  // Add Venezuelan country code "58"
  return `58${prefixWithoutZero}${phoneNumber}`
}

/**
 * Format a phone number with prefix and dash separator
 *
 * @param phone - Phone number string with country code 58 (e.g., "584121234567")
 * @returns Formatted phone number with dash separator, or empty string if invalid
 *
 * @example
 * formatPhone("584121234567")
 * // Returns: "0412-1234567"
 *
 * @example
 * formatPhone("584241234567")
 * // Returns: "0424-1234567"
 *
 * @example
 * formatPhone("")
 * // Returns: ""
 */
export function formatPhone(phone: string): string {
  const [phonePrefix, phoneNumber] = decodePhone(phone)
  if (!phonePrefix || !phoneNumber) {
    return ""
  }

  return `${phonePrefix}-${phoneNumber}`
}
