import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Logo({ className, to = "/", onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn("group inline-flex items-center gap-2", className)}
      aria-label="NovaShop home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 13V3l10 10V3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight">NovaShop</span>
    </Link>
  )
}

export function Container({ className, children }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}
