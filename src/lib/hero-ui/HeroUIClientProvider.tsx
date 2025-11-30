"use client"

import { HeroUIProvider } from "@heroui/system"
import { ToastProvider } from "@heroui/toast"
import type { ReactNode } from "react"

interface HeroUIClientProviderProps {
  children?: ReactNode
}

export default function HeroUIClientProvider({
  children,
}: HeroUIClientProviderProps) {
  return (
    <HeroUIProvider validationBehavior="aria" className="h-full">
      {children}
      <ToastProvider placement="top-right" />
    </HeroUIProvider>
  )
}
