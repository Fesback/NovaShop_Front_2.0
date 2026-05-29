import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const baseField =
  "w-full rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground/70 " +
  "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50"

export const Input = forwardRef(function Input(
  { className, type = "text", icon: Icon, label, error, id, ...props },
  ref,
) {
  const inputId = id || (label ? `input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined)

  const field = Icon ? (
    <div className="relative">
      <Icon
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={cn(
          baseField,
          "h-11 pl-11 pr-4 text-sm",
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        {...props}
      />
    </div>
  ) : (
    <input
      ref={ref}
      id={inputId}
      type={type}
      className={cn(
        baseField,
        "h-11 px-4 text-sm",
        error && "border-destructive focus-visible:ring-destructive",
        className,
      )}
      {...props}
    />
  )

  if (!label && !error) return field

  return (
    <div>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      {field}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  )
})

export const Textarea = forwardRef(function Textarea(
  { className, label, error, id, ...props },
  ref,
) {
  const textareaId =
    id || (label ? `textarea-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined)

  const field = (
    <textarea
      ref={ref}
      id={textareaId}
      className={cn(
        baseField,
        "min-h-28 px-4 py-3 text-sm resize-y",
        error && "border-destructive focus-visible:ring-destructive",
        className,
      )}
      {...props}
    />
  )

  if (!label && !error) return field

  return (
    <div>
      {label && <Label htmlFor={textareaId}>{label}</Label>}
      {field}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  )
})

export function Label({ className, children, ...props }) {
  return (
    <label
      className={cn("mb-2 block text-sm font-medium text-foreground", className)}
      {...props}
    >
      {children}
    </label>
  )
}
