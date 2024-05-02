import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function middleware() {
  const session = await auth()
  const response = NextResponse.next()
  const userId = String(session?.user?.id)
  const options = { httpOnly: true, secure: true }
  response.cookies.set("userId", userId, options)

  return response
}
