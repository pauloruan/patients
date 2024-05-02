import ThemeProvider from "./theme"

export function Providers({ children }: IProvidersProps): JSX.Element {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
