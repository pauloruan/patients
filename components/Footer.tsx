import Link from "next/link"
import { Typography } from "./typography"

export function Footer() {
  return (
    <footer className="flex h-16 w-full items-center justify-center bg-background dark:bg-background">
      <Typography.P className="text-xs">
        Made by&nbsp;
        <Link
          href="https://pauloruan.dev"
          className="font-bold hover:underline"
        >
          Paulo Ruan
        </Link>
        . All rights reserved.
      </Typography.P>
    </footer>
  )
}
