"use server"

import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import { routes } from "@/constants/routes"
import { $isAuthenticated } from "@/lib/auth/server"

interface GuestGuardProps {
  children: ReactNode
}

export async function GuestGuard({ children }: GuestGuardProps) {
  const isUserAuthenticated = await $isAuthenticated()

  if (isUserAuthenticated) {
    return redirect(routes.transactions)
  }

  return children
}
