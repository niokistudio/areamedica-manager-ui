import { EditTransactionPageContent } from "@/app/(manager)/transactions/edit/[id]/EditTransactionPageContent"

interface EditTransactionPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditTransactionPage({
  params,
}: EditTransactionPageProps) {
  const { id } = await params

  return <EditTransactionPageContent transactionId={id} />
}
