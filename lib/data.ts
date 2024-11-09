import { prisma } from "./prisma"

async function findPsychologistByUserId(userId: string) {
  return await prisma.psychologist.findUnique({
    where: { userId }
  })
}

async function createPsychologist(userId: string) {
  return await prisma.psychologist.create({
    data: { userId }
  })
}

async function findPatientsByPsychologistId(psychologistId: string) {
  return await prisma.patient.findMany({
    where: { psychologistId }
  })
}

async function findEventsByPsychologistId(psychologistId: string) {
  return await prisma.therapy.findMany({
    where: { psychologistId }
  })
}

async function findPatientByEmail(email: string) {
  return await prisma.patient.findUnique({
    where: { email }
  })
}

async function findPatientById(id: string) {
  return await prisma.patient.findUnique({
    where: { id }
  })
}

async function createPatient(data: PostPatientRequest, psychologistId: string) {
  return await prisma.patient.create({
    data: {
      ...data,
      psychologistId
    }
  })
}

async function updatePatient(data: PutPatientRequest, psychologistId: string) {
  return await prisma.patient.update({
    where: { id: data.id },
    data: {
      ...data,
      psychologistId
    }
  })
}

async function createTherapy(data: PostTherapyRequest, psychologistId: string) {
  return await prisma.therapy.create({
    data: {
      ...data,
      psychologistId
    }
  })
}

async function findTherapiesByPsychologistId(psychologistId: string) {
  return await prisma.therapy.findMany({
    where: { psychologistId },
    orderBy: { date: "asc" }
  })
}

async function getDashboardData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  const psychologist = await prisma.psychologist.findUnique({
    where: { userId: user?.id }
  })

  const allPatients = await prisma.patient.findMany({
    where: { psychologistId: psychologist?.id },
    take: 5,
    orderBy: { createdAt: "desc" }
  })

  const countAllPatients = await prisma.patient.count({
    where: { psychologistId: psychologist?.id }
  })

  const activePatients = await prisma.patient.findMany({
    where: { psychologistId: psychologist?.id, status: "ACTIVE" },
    take: 5,
    orderBy: { createdAt: "desc" }
  })

  const countActivePatients = await prisma.patient.count({
    where: { psychologistId: psychologist?.id, status: "ACTIVE" }
  })

  const archivedPatients = await prisma.patient.findMany({
    where: { psychologistId: psychologist?.id, status: "ARCHIVED" },
    take: 5,
    orderBy: { createdAt: "desc" }
  })

  const countArchivedPatients = await prisma.patient.count({
    where: { psychologistId: psychologist?.id, status: "ARCHIVED" }
  })

  const all = { count: countAllPatients, data: allPatients }
  const active = { count: countActivePatients, data: activePatients }
  const archived = { count: countArchivedPatients, data: archivedPatients }

  const patients = {
    all,
    active,
    archived
  }

  const events = await prisma.therapy.findMany({
    where: { psychologistId: psychologist?.id },
    orderBy: { createdAt: "desc" }
  })

  return {
    user,
    psychologist,
    patients,
    events
  }
}

export const db = {
  findPsychologistByUserId,
  createPsychologist,
  findPatientsByPsychologistId,
  findEventsByPsychologistId,
  findPatientByEmail,
  findPatientById,
  createPatient,
  updatePatient,
  createTherapy,
  findTherapiesByPsychologistId,
  getDashboardData
}
