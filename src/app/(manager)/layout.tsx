import type { ReactNode } from "react"
import { ManagerHeader } from "@/app/(manager)/components/ManagerHeader"
import { Footer } from "@/components/layout/Footer"

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto] grid-cols-1">
      <ManagerHeader />
      <main className="p-4 flex-1 w-full max-w-7xl mx-auto md:px-6 lg:px-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
