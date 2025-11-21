import axios from "axios"
import { mutate } from "swr"
import { apiRoutes, internalAuthRoutes } from "@/constants/api-routes"
import { setAccessToken } from "@/lib/tokens/client"
import type {
  AuthResponse,
  ClientAuthResponse,
  LoginRequest,
} from "@/types/auth"

export async function loginUser(loginRequest: LoginRequest) {
  // Call login API route
  const response = await axios.post<ClientAuthResponse>(
    internalAuthRoutes.login,
    loginRequest,
  )

  // Store access token in localStorage
  setAccessToken(response.data.access_token)

  // Fetch user data and update SWR cache
  await mutate(apiRoutes.userInfo)
}

export async function logoutUser() {
  await axios.post<ClientAuthResponse>(internalAuthRoutes.logout)
}

export async function refreshToken() {
  const response = await axios.post<AuthResponse>(
    internalAuthRoutes.refresh,
    {},
    { withCredentials: true },
  )

  return response.data
}
