import AuthProvider from "./auth"
import ThemeProvider from "./theme"

export function Providers({ children }: IProvidersProps): JSX.Element {
  return (
    <ThemeProvider>
      <AuthProvider>
      {children}
      </AuthProvider>
    </ThemeProvider>
  )
}
