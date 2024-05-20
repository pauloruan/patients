"use client"

import { CardContent } from "@/components/ui/card"
import { Table } from "@/components/ui/table"
import { API } from "@/services/axios"
import { useQuery } from "@tanstack/react-query"
import { BaseContent } from "./BaseContent"
import { BaseHeader } from "./BaseHeader"
import { EmptyTable } from "./EmptyTable"

export function FilterAllPatients() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: API.getDashboardData
  })
  const patients = data?.patients.all.slice()
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
