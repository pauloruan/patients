import { Card } from "@/components/ui/card"
import { FilterAllPatients } from "../tables/FilterAllPatients"
import { BaseFooter } from "./BaseFooter"
import { BaseHeader } from "./BaseHeader"

export function CardAll() {
  return (
    <Card>
      <BaseHeader />
      <FilterAllPatients />
      <BaseFooter />
    </Card>
  )
}
