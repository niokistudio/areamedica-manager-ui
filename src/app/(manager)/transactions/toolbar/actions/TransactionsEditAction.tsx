import { SquarePen } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function TransactionsEditAction() {
  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log("Edit clicked")
  }

  return (
    <Button
      variant="light"
      color="primary"
      isIconOnly
      onPress={handleEdit}
      aria-label="Editar"
    >
      <SquarePen className="size-4" />
    </Button>
  )
}
