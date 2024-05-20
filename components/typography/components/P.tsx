import { cn } from "@/lib/utils"
import { HTMLProps } from "react"

interface PProps extends HTMLProps<HTMLParagraphElement> {}

export function P({ children, className, ...props }: PProps) {
  return (
    <p
      {...props}
      className={cn(
        "max-h-max max-w-max font-sans text-base font-normal leading-tight tracking-wide text-gray-900 dark:text-gray-100",
        className
      )}
    >
      {children}
    </p>
  )
}
