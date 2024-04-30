"use client"

import { SessionProvider, SessionProviderProps } from "next-auth/react"

function AuthProvider({ children }: SessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
