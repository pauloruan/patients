import { cn } from "@/lib/utils"
import { HTMLProps } from "react"

interface StrongProps extends HTMLProps<HTMLElement> {}

export function Strong({ children, className, ...props }: StrongProps) {
  return (
    <strong
      {...props}
      className={cn(
        "leading-tight tracking-wide text-gray-900 dark:text-gray-100",
        className
      )}
    >
      {children}
    </strong>
  )
}
