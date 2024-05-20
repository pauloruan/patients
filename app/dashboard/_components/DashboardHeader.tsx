import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export async function DashboardHeader() {
  return (
    <div className="flex w-full flex-col items-start justify-start px-4 py-0 sm:px-6 ">
      <Breadcrumb className="my-4 w-full">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="font-sans">
              Login
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className="font-sans">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
