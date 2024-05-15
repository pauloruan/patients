import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Content } from "./_components/content"
import { Login } from "./_components/login"

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <Content>
      <Login />
    </Content>
  )
}
