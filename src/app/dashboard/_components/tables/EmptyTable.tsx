import { TableBody, TableCell, TableRow } from "@/app/_components/ui/table"

interface Props {
  isLoading: boolean
  isError: boolean
  hasPatients: boolean | undefined
}

export function EmptyTable({ hasPatients, isError, isLoading }: Props) {
  const shouldDisplayEmptyMessage = !isError && !isLoading && !hasPatients

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={4} className="font-sans">
          {isLoading && "Carregando..."}
          {isError && "Erro ao carregar os pacientes."}
          {shouldDisplayEmptyMessage && "Nenhum paciente encontrado."}
        </TableCell>
      </TableRow>
    </TableBody>
  )
}
