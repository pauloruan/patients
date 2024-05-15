import { db } from "@/src/lib/data"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"


export async function GET(request: NextRequest) {
  const url = String(process.env.URL)

  const userId = request.cookies.get("userId")?.value
  if (!userId) {
    return NextResponse.redirect(url)
  }

  let verifyPsychologist = await db.findPsychologistByUserId(userId)
  if (!verifyPsychologist) {
    verifyPsychologist = await db.createPsychologist(userId)
  }

  const data = await db.getDashboardData(userId)

  return NextResponse.json({
    ...data
  })
}
