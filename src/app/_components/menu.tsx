import {
  BackpackIcon,
  CalendarIcon,
  EnterIcon,
  ExitIcon,
  HamburgerMenuIcon,
  HomeIcon,
  PersonIcon
} from "@radix-ui/react-icons"
import { auth } from "@/auth"
import Link from "next/link"
import logout from "../_actions/logout"
import login from "../_actions/login"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet"

export async function Menu() {
  const session = await auth()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" aria-label="menu">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader className="text-left text-lg font-semibold">
          <SheetTitle className="font-sans">Menu</SheetTitle>
        </SheetHeader>
        {!session ? (
          <div className="mt-2 flex flex-col gap-3">
            <form action={login}>
              <Button
                size="lg"
                variant="outline"
                className="flex w-full items-center justify-start gap-2 font-sans"
              >
                <EnterIcon />
                Entrar
              </Button>
            </form>
          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-3">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex w-full items-center justify-start"
            >
              <Link
                href="/dashboard"
                className="flex w-full items-center justify-start gap-2 font-sans"
              >
                <HomeIcon />
                Início
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex w-full items-center justify-start gap-2 font-sans"
            >
              <Link
                href="/calendar"
                className="flex w-full items-center justify-start gap-2 font-sans"
              >
                <CalendarIcon />
                Calendário
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex w-full items-center justify-start gap-2 font-sans"
            >
              <Link
                href="/patients"
                className="flex w-full items-center justify-start gap-2 font-sans"
              >
                <PersonIcon />
                Pacientes
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex w-full items-center justify-start gap-2 font-sans"
            >
              <Link
                href="/sessions"
                className="flex w-full items-center justify-start gap-2 font-sans"
              >
                <BackpackIcon />
                Sessões
              </Link>
            </Button>
            <form action={logout}>
              <Button
                size="lg"
                variant="outline"
                className="flex w-full items-center justify-start gap-2 font-sans text-red-500 hover:text-red-400 dark:text-red-600 dark:hover:text-red-500"
              >
                <ExitIcon />
                Sair
              </Button>
            </form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
