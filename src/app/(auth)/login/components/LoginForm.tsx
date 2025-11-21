"use client"

import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { useTranslations } from "next-intl"
import { type FormEvent, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import type { APIError } from "@/types/api"

export function LoginForm() {
  const t = useTranslations("Auth.LoginPage")
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}

    // Email validation
    if (!email) {
      newErrors.email = t("email.required")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("email.invalid")
    }

    // Password validation
    if (!password) {
      newErrors.password = t("password.required")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({}) // Clear previous errors

    try {
      // Call login from AuthProvider
      await login({ email, password })
      // Note: AuthProvider handles redirect to /manager/transactions
    } catch (error) {
      console.error("Login error:", error)

      // Handle API errors
      const apiError = error as APIError
      setErrors({
        general:
          apiError.message ||
          "An error occurred during login. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        type="email"
        label={t("email.label")}
        placeholder={t("email.placeholder")}
        value={email}
        onValueChange={setEmail}
        isInvalid={!!errors.email}
        errorMessage={errors.email}
        isRequired
        autoComplete="email"
        isDisabled={isLoading}
        variant="underlined"
      />

      <Input
        type="password"
        label={t("password.label")}
        placeholder={t("password.placeholder")}
        value={password}
        onValueChange={setPassword}
        isInvalid={!!errors.password}
        errorMessage={errors.password}
        isRequired
        autoComplete="current-password"
        isDisabled={isLoading}
        variant="underlined"
      />

      {errors.general && (
        <div className="text-danger text-sm text-center">{errors.general}</div>
      )}

      <Button
        type="submit"
        color="primary"
        isLoading={isLoading}
        className="self-center"
      >
        {isLoading ? t("submitting") : t("submit")}
      </Button>
    </form>
  )
}
