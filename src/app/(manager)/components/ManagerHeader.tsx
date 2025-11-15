import Logo from "@/assets/logo/logo-areamedica.svg"

export function ManagerHeader() {
  return (
    <header className="flex justify-start py-3 px-10 bg-primary">
      <Logo className="text-primary-foreground h-8" />
    </header>
  )
}
