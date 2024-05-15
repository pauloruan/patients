import { db } from "@/src/lib/data"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value
  if (!userId) {
    return NextResponse.json({
      message: "Usuário não encontrado."
    })
  }

  let psychologist = await db.findPsychologistByUserId(userId)
  if (!psychologist) {
    psychologist = await db.createPsychologist(userId)
  }

  const patients = await db.findPatientsByPsychologistId(psychologist.id)

  return NextResponse.json({
    patients
  })
}

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

  const verifyPatient = await db.findPatientByEmail(body.email)
  if (verifyPatient) {
    return NextResponse.json({
      message: "Paciente já cadastrado."
    })
  }

  const patient = await db.createPatient(body, psychologist.id)

  if (!patient) {
    return NextResponse.json({
      message: "Erro ao cadastrar paciente."
    })
  }

  return NextResponse.json({
    message: "Paciente cadastrado com sucesso!"
  })
}

export async function PUT(request: NextRequest) {
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

  const patient = await db.findPatientById(body.id)
  if (!patient) {
    return NextResponse.json({
      message: "Paciente não encontrado."
    })
  }

  const updatedPatient = await db.updatePatient(body, psychologist.id)
  if (!updatedPatient) {
    return NextResponse.json({
      message: "Erro ao atualizar paciente."
    })
  }

  return NextResponse.json({
    message: "Paciente atualizado com sucesso!"
  })
}
