"use client"

import { Avatar } from "@heroui/avatar"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown"
import { LogOut, User } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useMemo } from "react"
import { useAuth } from "@/hooks/use-auth"

/**
 * User Avatar Dropdown Component
 * Displays user avatar with dropdown menu containing logout option
 */
export function UserAvatarDropdown() {
  const t = useTranslations("ManagerHeader")
  const { user, logout } = useAuth()

  const handleLogout = useCallback(async () => {
    await logout()
  }, [logout])

  // Get user initials from full name
  const userInitials = useMemo(() => {
    if (!user?.full_name) {
      return null
    }

    const names = user.full_name.trim().split(" ")
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }

    // First letter of first name and first letter of last name
    return (
      names[0].charAt(0).toUpperCase() +
      names[names.length - 1].charAt(0).toUpperCase()
    )
  }, [user?.full_name])

  if (!user) {
    return null
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          name={user.full_name}
          showFallback
          fallback={userInitials}
          className="cursor-pointer"
          icon={<User className="size-5" />}
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label={t("userMenu")} variant="flat">
        <DropdownSection showDivider>
          <DropdownItem
            key="profile"
            isReadOnly
            className="opacity-100 cursor-default border-0 data-[hover=true]:bg-transparent data-[hover=true]:border-0"
            textValue={user.full_name}
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm">{user.full_name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            color="danger"
            startContent={<LogOut className="size-4" />}
            onPress={handleLogout}
          >
            {t("logout")}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
