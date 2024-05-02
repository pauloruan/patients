import { db } from "@/app/lib/prisma"

async function main() {
  const psychologist = await db.psychologist.findFirst({
    where: { user: { email: "ruanpr182@gmail.com" } }
  })

  const psychologistId = String(psychologist?.id)

  const ozzy = await db.patient.create({
    data: {
      name: "Ozzy",
      psychologistId,
      email: "ozzy@email.com",
      age: 25,
      diagnosis: "Depressão"
    }
  })

  const snow = await db.patient.create({
    data: {
      name: "Snow",
      email: "snow@email.com",
      psychologistId,
      age: 30,
      diagnosis: "Ansiedade"
    }
  })

  const therapy1 = await db.therapy.create({
    data: {
      patientId: ozzy.id,
      psychologistId,
      duration: 50,
      basePrice: 100.00,
      discountPercentage: 0,
      local: "ONLINE",
      date: new Date(new Date().setDate(new Date().getDate() - 28)),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 28)),
      payment: "PAID",
      status: "COMPLETED"
    },
  })

  const therapy2 = await db.therapy.create({
    data: {
      patientId: ozzy.id,
      psychologistId,
      duration: 50,
      basePrice: 100.00,
      discountPercentage: 0,
      local: "ONLINE",
      date: new Date(new Date().setDate(new Date().getDate() - 21)),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 21)),
      payment: "PAID",
      status: "COMPLETED"
    }
  })

  const therapy3 = await db.therapy.create({
    data: {
      patientId: ozzy.id,
      psychologistId,
      duration: 50,
      basePrice: 100.00,
      discountPercentage: 0,
      local: "ONLINE",
      date: new Date(new Date().setDate(new Date().getDate() - 14)),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 14)),
      payment: "PAID",
      status: "COMPLETED"
    }
  })

  const therapy4 = await db.therapy.create({
    data: {
      patientId: ozzy.id,
      psychologistId,
      duration: 50,
      basePrice: 100.00,
      discountPercentage: 0,
      local: "ONLINE",
      date: new Date(new Date().setDate(new Date().getDate() - 7)),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
      payment: "PAID",
      status: "COMPLETED"
    }
  })

  const therapy5 = await db.therapy.create({
    data: {
      patientId: snow.id,
      psychologistId,
      duration: 50,
      basePrice: 100.00,
      discountPercentage: 0,
      local: "PRESENCIAL",
      date: new Date(new Date().setDate(new Date().getDate() - 15)),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 15)),
      payment: "PAID",
      status: "COMPLETED"
    }
  })

  const therapy6 = await db.therapy.create({
    data: {
      patientId: snow.id,
      psychologistId,
      duration: 50,
      basePrice: 100.00,
      discountPercentage: 0,
      local: "PRESENCIAL",
      date: new Date(new Date().setDate(new Date().getDate() - 8)),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 8)),
      payment: "PAID",
      status: "COMPLETED"
    }
  })

  console.table(psychologist)
  console.table([ozzy, snow])
  console.table([therapy1, therapy2, therapy3, therapy4, therapy5, therapy6])
}

main()
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
