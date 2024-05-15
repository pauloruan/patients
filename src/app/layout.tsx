import { Toaster } from "@/src/components/ui/toaster"
import { cn } from "@/src/lib/utils"
import { Providers } from "@/src/providers"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({
  preload: true,
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Patients",
  description: "App to manage patients"
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full bg-background dark:bg-background",
          inter.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
