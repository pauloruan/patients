import Link from "next/link"
import { Typography } from "./typography"

export function Footer() {
  return (
    <footer className="flex h-16 w-full items-center justify-center bg-background dark:bg-background">
      <Typography.P className="text-xs">
        Feito com&nbsp;
        <span role="img" aria-label="love">
          ❤️
        </span>
        &nbsp;por&nbsp;
        <Link
          href="https://pauloruan.dev"
          className="font-bold hover:underline"
        >
          Paulo Ruan
        </Link>
      </Typography.P>
    </footer>
  )
}
