import { cn } from "@/lib/utils"

const variants = {
  default: "bg-secondary text-secondary-foreground border border-border",
  solid: "bg-primary text-primary-foreground",
  outline: "border border-border text-foreground",
  success: "bg-success/10 text-success border border-success/20",
  destructive: "bg-destructive/10 text-destructive border border-destructive/20",
  muted: "bg-muted text-muted-foreground",
}

export function Badge({ className, variant = "default", children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
