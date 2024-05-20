import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function BaseHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="font-sans">Nome</TableHead>
        <TableHead className="font-sans">Status</TableHead>
        <TableHead className="hidden font-sans md:table-cell">
          Criado em
        </TableHead>
        <TableHead className="hidden font-sans md:table-cell">Idade</TableHead>
        <TableHead className="font-sans">Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}
