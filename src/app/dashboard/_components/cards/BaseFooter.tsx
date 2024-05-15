import { Button } from "@/src/components/ui/button"
import { CardFooter } from "@/src/components/ui/card"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export function BaseFooter() {
  return (
    <CardFooter>
      <Button className="gap-1 font-sans" variant="outline" asChild>
        <Link href="/patients">
          <ArrowTopRightIcon className="h-4 w-4" />
          Ver todos os pacientes
        </Link>
      </Button>
    </CardFooter>
  )
}
