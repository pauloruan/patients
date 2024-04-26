import {
  BackpackIcon,
  CalendarIcon,
  ExitIcon,
  HamburgerMenuIcon,
  HomeIcon,
  PersonIcon
} from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet"

export function Menu() {
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

        <div className="mt-2 flex flex-col gap-3">
          <Button
            size="lg"
            variant="outline"
            className="flex w-full items-center justify-start gap-2 font-sans"
          >
            <HomeIcon />
            Início
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex w-full items-center justify-start gap-2 font-sans"
          >
            <CalendarIcon />
            Calendário
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex w-full items-center justify-start gap-2 font-sans"
          >
            <PersonIcon />
            Pacientes
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex w-full items-center justify-start gap-2 font-sans"
          >
            <BackpackIcon />
            Sessões
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="flex w-full items-center justify-start gap-2 font-sans text-red-500 hover:text-red-400 dark:text-red-600 dark:hover:text-red-500"
          >
            <ExitIcon />
            Sair
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
