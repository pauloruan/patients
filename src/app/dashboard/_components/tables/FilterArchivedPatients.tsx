"use client"

import { CardContent } from "@/app/_components/ui/card"
import { Table } from "@/app/_components/ui/table"
import { API } from "@/src/services/axios"
import { useQuery } from "@tanstack/react-query"
import { BaseContent } from "./BaseContent"
import { BaseHeader } from "./BaseHeader"
import { EmptyTable } from "./EmptyTable"

export function FilterArchivedPatients() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: API.getDashboardData
  })
  const patients = data?.patients.archived.slice()
  const hasPatients = patients && patients.length > 0
  const EmptyCondition = !hasPatients || isError || isLoading
  const displayCondition = hasPatients && !isError && !isLoading

  return (
    <CardContent>
      <Table>
        <BaseHeader />
        {EmptyCondition && (
          <EmptyTable
            hasPatients={hasPatients}
            isError={isError}
            isLoading={isLoading}
          />
        )}
        {displayCondition && <BaseContent patients={patients} />}
      </Table>
    </CardContent>
  )
}
