import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/src/components/ui/tabs"
import { CreatePatient } from "./actions/CreatePatient"
import { CardActive } from "./cards/CardActive"
import { CardAll } from "./cards/CardAll"
import { CardArchived } from "./cards/CardArchived"

export function DashboardCards() {
  return (
    <div className="w-full flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger className="font-sans" value="all">
              Todos
            </TabsTrigger>
            <TabsTrigger className="font-sans" value="active">
              Ativos
            </TabsTrigger>
            <TabsTrigger className="font-sans" value="archived">
              Arquivados
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <CreatePatient />
          </div>
        </div>
        <TabsContent value="all">
          <CardAll />
        </TabsContent>
        <TabsContent value="active">
          <CardActive />
        </TabsContent>
        <TabsContent value="archived">
          <CardArchived />
        </TabsContent>
      </Tabs>
    </div>
  )
}
