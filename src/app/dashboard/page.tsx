import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Content } from "../../components/Content"
import { DashboardContent } from "./_components/DashboardContent"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <Content>
      <DashboardContent />
    </Content>
  )
}
