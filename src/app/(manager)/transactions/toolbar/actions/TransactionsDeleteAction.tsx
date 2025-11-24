import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function TransactionsDeleteAction() {
  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete clicked")
  }

  return (
    <Button
      variant="light"
      color="danger"
      isIconOnly
      onPress={handleDelete}
      aria-label="Eliminar"
    >
      <Trash2 className="size-4" />
    </Button>
  )
}
