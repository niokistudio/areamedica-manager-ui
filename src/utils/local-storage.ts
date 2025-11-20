/**
 * Local Storage Utilities
 * Type-safe abstractions for interacting with browser local storage
 * SSR-safe with window checks
 */

/**
 * Check if localStorage is available
 * Returns false during SSR or if localStorage is disabled
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") {
    return false
  }

  try {
    return !!window.localStorage
  } catch {
    return false
  }
}

/**
 * Get an item from localStorage and parse it as JSON
 * @param key - The key to retrieve
 * @returns The parsed value or null if not found or invalid JSON
 */
export function getItem<T>(key: string): T | null {
  if (!isLocalStorageAvailable()) {
    return null
  }

  try {
    const item = window.localStorage.getItem(key)

    if (item === null) {
      return null
    }

    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error getting/parsing item from localStorage (${key}):`, error)
    return null
  }
}

/**
 * Set an item in localStorage (automatically serialized as JSON)
 * @param key - The key to set
 * @param value - The value to store (will be JSON stringified)
 * @returns true if successful, false otherwise
 */
export function setItem<T>(key: string, value: T): boolean {
  if (!isLocalStorageAvailable()) {
    return false
  }

  try {
    const serialized = JSON.stringify(value)
    window.localStorage.setItem(key, serialized)
    return true
  } catch (error) {
    console.error(`Error setting/serializing item in localStorage (${key}):`, error)
    return false
  }
}

/**
 * Remove an item from localStorage
 * @param key - The key to remove
 * @returns true if successful, false otherwise
 */
export function removeItem(key: string): boolean {
  if (!isLocalStorageAvailable()) {
    return false
  }

  try {
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing item from localStorage (${key}):`, error)
    return false
  }
}

/**
 * Clear all items from localStorage
 * @returns true if successful, false otherwise
 */
export function clear(): boolean {
  if (!isLocalStorageAvailable()) {
    return false
  }

  try {
    window.localStorage.clear()
    return true
  } catch (error) {
    console.error("Error clearing localStorage:", error)
    return false
  }
}

/**
 * Check if a key exists in localStorage
 * @param key - The key to check
 * @returns true if the key exists, false otherwise
 */
export function hasItem(key: string): boolean {
  return getItem(key) !== null
}

/**
 * Create a namespaced storage accessor
 * Useful for organizing storage keys by feature/module
 * @param namespace - The namespace prefix
 * @returns An object with namespaced storage methods
 */
export function createNamespacedStorage(namespace: string) {
  const getKey = (key: string) => `${namespace}:${key}`

  return {
    getItem: <T>(key: string) => getItem<T>(getKey(key)),
    setItem: <T>(key: string, value: T) => setItem(getKey(key), value),
    removeItem: (key: string) => removeItem(getKey(key)),
    hasItem: (key: string) => hasItem(getKey(key)),
    clear: () => clear(),
  }
}
