import { Footer } from "./footer"
import { Header } from "./header"

interface IContentProps extends IRootLayoutProps {}

export function Content({ children }: IContentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background px-2 dark:bg-background">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
