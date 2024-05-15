import { cn } from "@/src/lib/utils"
import { HTMLProps } from "react"

interface H4Props extends HTMLProps<HTMLHeadingElement> {}

export function H4({ children, className, ...props }: H4Props) {
  return (
    <h4
      {...props}
      className={cn(
        "max-h-max max-w-max font-sans text-lg font-semibold leading-tight tracking-wide text-gray-900 dark:text-gray-100",
        className
      )}
    >
      {children}
    </h4>
  )
}
