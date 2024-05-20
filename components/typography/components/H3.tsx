import { cn } from "@/lib/utils"
import { HTMLProps } from "react"

interface H3Props extends HTMLProps<HTMLHeadingElement> {}

export function H3({ children, className, ...props }: H3Props) {
  return (
    <h3
      {...props}
      className={cn(
        "max-h-max max-w-max font-sans text-xl font-bold leading-tight tracking-wide text-gray-900 dark:text-gray-100",
        className
      )}
    >
      {children}
    </h3>
  )
}
