import { AUTH_ACCESS_TOKEN_COOKIE } from "@/constants/cookies"
import { getCookie } from "@/utils/cookies/server"

/**
 * Get auth token from cookies
 */
export async function getAccessToken(): Promise<string | null> {
  return await getCookie(AUTH_ACCESS_TOKEN_COOKIE)
}
