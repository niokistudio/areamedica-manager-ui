import type { ReactNode } from "react"
import { AuthHeader } from "@/app/(auth)/components/AuthHeader"
import { GuestGuard } from "@/components/guards/GuestGuard"
import { Footer } from "@/components/layout/Footer"

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <GuestGuard>
      <div className="h-full grid grid-rows-[1fr_auto] grid-cols-1">
        <div className="flex flex-col bg-background">
          <AuthHeader />
          <main className="p-4 flex-1">{children}</main>
        </div>
        <Footer />
      </div>
    </GuestGuard>
  )
}
