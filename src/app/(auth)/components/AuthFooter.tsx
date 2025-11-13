"use client"

export function AuthFooter() {
  return (
    <footer className="bg-muted text-muted-foreground text-xs flex justify-center py-3 px-6">
      © {new Date().getFullYear()} Nioki Studio
    </footer>
  )
}
