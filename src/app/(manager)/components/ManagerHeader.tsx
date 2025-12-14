import { UserAvatarDropdown } from "@/app/(manager)/components/UserAvatarDropdown"
import Logo from "@/assets/logo/logo-areamedica.svg"

export function ManagerHeader() {
  return (
    <div className="bg-primary">
      <header className="flex items-center justify-between max-w-7xl mx-auto py-3 px-4 md:px-6 lg:px-10">
        <Logo className="text-primary-foreground h-8 flex-shrink-0" />
        <UserAvatarDropdown />
      </header>
    </div>
  )
}
