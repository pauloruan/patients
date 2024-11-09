"use client"

import { Typography } from "@/components/typography"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { API } from "@/services/axios"
import { useQuery } from "@tanstack/react-query"
import { CreateSession } from "../actions/CreateSession"
import { SewingPinFilledIcon } from '@radix-ui/react-icons'

export function Events() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: API.getDashboardData
  })
  const today = new Date()
  const MILLISECONDS_IN_A_DAY = 86400000
  const events = data?.events.slice()
  const hasEvents = events && events.length > 0
  const EmptyCondition = !isError && !isLoading && !hasEvents
  const displayCondition = hasEvents && !isError && !isLoading

  function checkWeekScope(verifyDate: Date) {
    const oneWeek = new Date(today.getTime() + 7 * MILLISECONDS_IN_A_DAY)
    return verifyDate >= today && verifyDate <= oneWeek
  }

  // TODO: Refatorar essa função, aparentemente não será mais necessário retornar todas as sessões da semana, mas sim a próxima sessão.
  function getEventsThisWeek() {
    const eventsInWeek: Event[] = []
    events?.forEach((event) => {
      const eventDate = new Date(event.date)
      if (checkWeekScope(eventDate)) {
        eventsInWeek.push(event)
      }
    })
    return eventsInWeek
  }

  function displayCountMessage() {
    const count = getEventsThisWeek().length
    if (count === 0) {
      return "Você não tem sessões marcadas para esta semana."
    }
    if (count === 1) {
      return "Você tem 1 sessão marcada para esta semana."
    }
    return `Você tem ${count} sessões marcadas para esta semana.`
  }

  console.log("getEventsThisWeek: ", getEventsThisWeek())

  return (
    <div className="flex w-full flex-col items-start justify-start">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Sessões</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography.P>
              {EmptyCondition &&
                "Você não tem sessões marcadas para esta semana."}
              {isError && "Ocorreu um erro ao carregar as sessões."}
              {isLoading && "Carregando sessões..."}
              {displayCondition && displayCountMessage()}
            </Typography.P>
            <Typography.P className="bg-red-600">
              {displayCondition &&
                <span>{JSON.stringify(getEventsThisWeek(), null, 2)
                }</span>
                }
            </Typography.P>
          </CardContent>
          <CardFooter>
            <CreateSession />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
