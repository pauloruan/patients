import { db } from "@/lib/data"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value
  const body = await request.json()

  if (!userId) {
    return NextResponse.json({
      message: "Usuário não encontrado."
    })
  }

  const psychologist = await db.findPsychologistByUserId(userId)
  if (!psychologist) {
    return NextResponse.json({
      message: "Psicólogo não encontrado."
    })
  }

  const verifyPatient = await db.findPatientById(body.patientId)
  if (!verifyPatient) {
    return NextResponse.json({
      message: "Paciente não encontrado."
    })
  }

  const therapy = await db.createTherapy(body, psychologist.id)

  if (!therapy) {
    return NextResponse.json({
      message: "Erro ao cadastrar sessão."
    })
  }

  return NextResponse.json({
    message: "Sessão cadastrada com sucesso!"
  })
}

export async function GET(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value

  if (!userId) {
    return NextResponse.json({
      message: "Usuário não encontrado."
    })
  }

  const psychologist = await db.findPsychologistByUserId(userId)
  if (!psychologist) {
    return NextResponse.json({
      message: "Psicólogo não encontrado."
    })
  }

  const therapies = await db.findTherapiesByPsychologistId(psychologist.id)

  if (!therapies) {
    return NextResponse.json({
      message: "Erro ao buscar sessões."
    })
  }

  return NextResponse.json({
    therapies
  })
}
