import { Badge } from "@/app/_components/ui/badge"
import { TableBody, TableCell, TableRow } from "@/app/_components/ui/table"
import { ArchivePatient } from "../actions/ArchivePatient"
import { EditPatient } from "../actions/EditPatient"

interface Props {
  patients: Patient[] | undefined
}

export function BaseContent({ patients }: Props) {
  if (!patients) return null

  return (
    <TableBody>
      {patients.map((patient) => (
        <TableRow key={patient.id}>
          <TableCell className="font-sans font-medium">
            {patient.name}
          </TableCell>
          <TableCell>
            <Badge
              className="font-sans"
              variant={patient.status === "ACTIVE" ? "outline" : "secondary"}
            >
              {patient.status === "ACTIVE" ? "Ativo" : "Arquivado"}
            </Badge>
          </TableCell>
          <TableCell className="hidden font-sans md:table-cell">
            {new Date(patient.createdAt).toLocaleDateString("pt-br")}
          </TableCell>
          <TableCell className="hidden font-sans md:table-cell">
            {patient.age}
          </TableCell>
          <TableCell className="flex items-center justify-start gap-2">
            <EditPatient patient={patient} />
            <ArchivePatient patient={patient} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
