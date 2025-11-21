import type { output } from "zod"
import type { LoginRequestSchema } from "@/app/api/auth/login/login.schema"

export type LoginRequest = output<typeof LoginRequestSchema>

export interface AuthResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

export type ClientAuthResponse = Omit<AuthResponse, "refresh_token">
