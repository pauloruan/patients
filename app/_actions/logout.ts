"use server"

import { signOut } from "@/auth"
import { cookies } from "next/headers"

export default async function logout() {
  const cookieStore = cookies()

  try {
    await signOut()
    const verifyUserIdCookie = cookieStore.has("userId")
    if (verifyUserIdCookie) {
      cookieStore.delete("userId")
      cookieStore.delete("email")
    }
  } catch (e) {
    throw e
  }
}
