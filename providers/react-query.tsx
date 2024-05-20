"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

type ReactQueryProviderProps = {
  children: React.ReactNode
}

function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
