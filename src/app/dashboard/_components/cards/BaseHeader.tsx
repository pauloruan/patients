import {
  CardDescription,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card"

export function BaseHeader() {
  return (
    <CardHeader>
      <CardTitle className="font-sans">Pacientes</CardTitle>
      <CardDescription className="font-sans">
        Lista de pacientes cadastrados.
      </CardDescription>
    </CardHeader>
  )
}
