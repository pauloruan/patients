import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "./app/lib/prisma"

const config: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET
}

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST }
} = NextAuth(config)
