"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import login from "../actions/login"
import { Typography } from "./typography"

export function Login() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardContent className="flex flex-col items-center justify-center gap-6 p-8">
        <span role="img" aria-label="brain" className="text-2xl">
          🧠
        </span>
        <form action={login} className="w-full text-left">
          <Button className="w-full font-sans">Entre com Google</Button>
        </form>
        <Typography.P className="text-sm text-gray-500 dark:text-gray-400">
          Acesse com sua conta do Google para continuar.
        </Typography.P>
      </CardContent>
    </Card>
  )
}
