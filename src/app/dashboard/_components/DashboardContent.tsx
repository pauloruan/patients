import { DashboardCards } from "./DashboardCards"
import { DashboardHeader } from "./DashboardHeader"

export function DashboardContent() {
  return (
    <div className="flex min-h-screen w-full flex-col rounded-lg bg-muted/40">
      <DashboardHeader />
      <DashboardCards />
    </div>
  )
}
