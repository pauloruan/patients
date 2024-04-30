import { Typography } from "@/app/_components/typography"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/app/_components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/app/_components/ui/breadcrumb"
import { Input } from "@/app/_components/ui/input"
import { db } from "@/app/lib/prisma"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import type { User } from "next-auth"

interface IDashboardProps {
  user: User | undefined
}

export async function Info({ user }: IDashboardProps) {
  const verifyUser = await db.user.findUnique({
    where: {
      email: String(user?.email)
    }
  })

  const verifyPsychologist = await db.psychologist.findUnique({
    where: {
      userId: verifyUser?.id
    }
  })

  if (!verifyPsychologist) {
    await db.psychologist.create({
      data: {
        userId: String(verifyUser?.id)
      }
    })
  }

  const countPatients = await db.patient.count({
    where: {
      psychologistId: verifyPsychologist?.id
    }
  })

  const countEvents = await db.therapy.count({
    where: {
      psychologistId: verifyPsychologist?.id
    }
  })

  return (
    <div className="flex min-h-screen w-full flex-col rounded-lg bg-muted/40">
      <div className="p-1 flex w-full items-center justify-between">
        <Breadcrumb className="m-1 hidden w-full md:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="font-sans">
                Login
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="font-sans">
                Início
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex w-full md:max-w-max items-center justify-center gap-2">
          <div className="relative flex h-12 w-full items-center justify-start">
            <MagnifyingGlassIcon className="absolute m-4 h-4 w-4 text-white" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="m-1 h-8 w-full rounded-lg bg-background pl-8 font-sans placeholder:font-sans md:w-48 lg:w-80"
            />
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage alt="User Avatar" src={String(user?.image)} />
            <AvatarFallback className="font-sans">
              {String(user?.name).charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <Typography.H2>
          Eventos: {countEvents}
        </Typography.H2>
      </div>
      <div>
        <Typography.H2>
          Pacientes: {countPatients}
        </Typography.H2>
      </div>
    </div>
  )
}
