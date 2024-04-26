import { cn } from "@/app/lib/utils"
import { HTMLProps } from "react"

interface H1Props extends HTMLProps<HTMLHeadingElement> {}

export function H1({ children, className, ...props }: H1Props) {
  return (
    <h1
      {...props}
      className={cn(
        "max-h-max max-w-max font-sans text-4xl font-black leading-tight tracking-wide text-gray-900 dark:text-gray-100",
        className
      )}
    >
      {children}
    </h1>
  )
}
