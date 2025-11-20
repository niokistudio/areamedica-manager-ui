"use client"

import type { ReactNode } from "react"
import { SWRConfig } from "swr"
import { fetcher } from "@/lib/swr/fetcher"

interface SWRProviderProps {
  children: ReactNode
}

export function SWRClientProvider({ children }: SWRProviderProps) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
}
