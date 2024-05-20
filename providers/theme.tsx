"use client"

import { ThemeProvider as Provider } from "next-themes"
import { useEffect, useState } from "react"

function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div>{children}</div>
  }

  return (
    <Provider
      enableSystem
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      {children}
    </Provider>
  )
}

export default ThemeProvider
