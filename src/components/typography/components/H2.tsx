import { cn } from "@/src/lib/utils"
import { HTMLProps } from "react"

interface H2Props extends HTMLProps<HTMLHeadingElement> {}

export function H2({ children, className, ...props }: H2Props) {
  return (
    <h2
      {...props}
      className={cn(
        "max-h-max max-w-max font-sans text-2xl font-extrabold leading-relaxed tracking-wide text-gray-900 dark:text-gray-100",
        className
      )}
    >
      {children}
    </h2>
  )
}
