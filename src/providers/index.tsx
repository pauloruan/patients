import ReactQueryProvider from "./react-query"
import ThemeProvider from "./theme"

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <ThemeProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  )
}
