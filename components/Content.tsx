import { Footer } from "./Footer"
import { Header } from "./Header"

interface ContentProps extends RootLayoutProps {}

export function Content({ children }: ContentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background px-2 dark:bg-background">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
