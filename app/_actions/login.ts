"use server"

import { signIn } from "@/auth"

export default async function login() {
  try {
    await signIn("google", {
      redirectTo: "/dashboard"
    })
  } catch (e) {
    throw e
  }
}
