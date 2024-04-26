import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="flex h-12 w-full items-center justify-between bg-background px-4 dark:bg-background">
      <span role="img" aria-label="brain" className="text-xl">
        🧠
      </span>
      <ThemeToggle />
    </header>
  )
}
