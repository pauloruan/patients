import { Card } from "@/components/ui/card"
import { FilterArchivedPatients } from "../tables/FilterArchivedPatients"
import { BaseFooter } from "./BaseFooter"
import { BaseHeader } from "./BaseHeader"

export function CardArchived() {
  return (
    <Card>
      <BaseHeader />
      <FilterArchivedPatients />
      <BaseFooter />
    </Card>
  )
}
