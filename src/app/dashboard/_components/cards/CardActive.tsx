import { Card } from "@/src/components/ui/card"
import { FilterActivePatients } from "../tables/FilterActivePatients"
import { BaseFooter } from "./BaseFooter"
import { BaseHeader } from "./BaseHeader"

export function CardActive() {
  return (
    <Card>
      <BaseHeader />
      <FilterActivePatients />
      <BaseFooter />
    </Card>
  )
}
