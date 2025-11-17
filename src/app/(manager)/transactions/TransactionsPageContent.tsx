import { Input } from "@heroui/input"
import { Download, Plus, Search, SquarePen, Trash2 } from "lucide-react"
import { TransactionsTable } from "@/app/(manager)/transactions/TransactionsTable"
import { Button } from "@/components/ui/Button"

export function TransactionsPageContent() {
  return (
    <div className="h-full flex flex-col pt-10">
      <div className="flex justify-between mb-14">
        <h1 className="text-3xl font-bold">Listado de transacciones</h1>
        <Button color="primary">
          Nueva Consulta <Plus className="size-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between gap-2">
          <Input
            className="max-w-xs"
            placeholder="Buscar transacciones"
            endContent={
              <div>
                <Button size="sm" variant="light" isIconOnly>
                  <Search className="size-4" />
                </Button>
              </div>
            }
          />
          <div className="flex gap-2">
            <Button variant="light" color="primary" isIconOnly>
              <Download className="size-4" />
            </Button>
            <Button variant="light" color="primary" isIconOnly>
              <SquarePen className="size-4" />
            </Button>
            <Button variant="light" color="danger" isIconOnly>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
        <TransactionsTable />
      </div>
    </div>
  )
}
