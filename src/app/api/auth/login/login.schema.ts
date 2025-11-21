import { email, object, string } from "zod"

export const LoginRequestSchema = object({
  email: email().trim().min(1).lowercase(),
  password: string().trim(),
})
