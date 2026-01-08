/**
 * Module-level storage for the current access token.
 * This allows the axios interceptor to access the token synchronously
 * without calling getSession() which triggers a network request.
 *
 * The token is kept in sync with the SessionProvider via the
 * SessionTokenSync component.
 */
let currentAccessToken: string | null = null

/**
 * Sets the current access token in module-level storage.
 * Called by SessionTokenSync when the session updates.
 */
export function setAccessToken(token: string | null): void {
  currentAccessToken = token
}

/**
 * Gets the current access token from module-level storage.
 * Used by the axios interceptor to add Authorization headers.
 * Returns null if no token is available or user is not authenticated.
 */
export function getAccessToken(): string | null {
  return currentAccessToken
}

/**
 * Clears the current access token from module-level storage.
 * Called by SessionTokenSync when the user logs out.
 */
export function clearAccessToken(): void {
  currentAccessToken = null
}
