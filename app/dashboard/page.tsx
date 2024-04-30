import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Content } from "../_components/content"
import { Info } from "./_components/info"

export default async function DashboardPage() {
  let user = undefined
  const session = await auth()

  if (session) {
    user = session.user
  } else {
    redirect("/")
  }

  return (
    <Content>
      <Info user={user} />
    </Content>
  )
}
