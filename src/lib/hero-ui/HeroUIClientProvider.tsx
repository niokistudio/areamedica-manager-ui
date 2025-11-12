"use client"

import { HeroUIProvider } from "@heroui/system"
import type { ReactNode } from "react"

interface HeroUIClientProviderProps {
  children?: ReactNode
}

export default function HeroUIClientProvider({
  children,
}: HeroUIClientProviderProps) {
  return <HeroUIProvider className="h-full">{children}</HeroUIProvider>
}
