import type { ReactNode } from "react"
import { AuthFooter } from "@/app/(auth)/components/AuthFooter"
import { AuthHeader } from "@/app/(auth)/components/AuthHeader"

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="h-full grid grid-rows-[1fr_auto] grid-cols-1">
      <div className="flex flex-col bg-background">
        <AuthHeader />
        <main className="p-4 flex-1">{children}</main>
      </div>
      <AuthFooter />
    </div>
  )
}
