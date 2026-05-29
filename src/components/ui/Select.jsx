import { forwardRef } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export const Select = forwardRef(function Select(
  { className, children, label, error, id, ...props },
  ref,
) {
  const selectId =
    id || (label ? `select-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined)

  const field = (
    <div className="relative">
      <select
        ref={ref}
        id={selectId}
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-input bg-card px-4 pr-10 text-sm text-foreground",
          "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )

  if (!label && !error) return field

  return (
    <div>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      {field}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  )
})
