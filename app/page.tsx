import { auth } from "@/auth"
import { Content } from "@/components/Content"
import { Login } from "@/components/Login"
import { redirect } from "next/navigation"

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
