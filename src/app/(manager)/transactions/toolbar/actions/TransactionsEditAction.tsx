import { SquarePen } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"
import { Button } from "@/components/ui/Button"
import { routes } from "@/constants/routes"
import { useTransactionsStore } from "@/stores/useTransactionsStore"

export function TransactionsEditAction() {
  const { selectedKeys } = useTransactionsStore()

  const editUrl = useMemo(
    () =>
      selectedKeys !== "all"
        ? routes.transactionEdit([...selectedKeys.values()][0] as string)
        : undefined,
    [selectedKeys],
  )

  if (selectedKeys === "all" || selectedKeys.size > 1) {
    return null
  }

  return (
    <Button
      as={Link}
      href={editUrl}
      variant="light"
      color="primary"
      isIconOnly
      aria-label="Editar"
    >
      <SquarePen className="size-4" />
    </Button>
  )
}
