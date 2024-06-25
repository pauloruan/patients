import { Menu } from "./Menu"
import { ThemeToggle } from "./ThemeToggle"
import { Typography } from "./typography"

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background p-4 dark:bg-background">
      <Menu />
      <Typography.P className="font-sans text-sm font-semibold">
        <span role="img" aria-label="brain">
          🧠
        </span>
        &nbsp;Patients
      </Typography.P>
      <ThemeToggle />
    </header>
  )
}
