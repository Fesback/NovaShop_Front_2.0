import { cn } from "@/lib/utils"

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-muted shimmer",
        className,
      )}
      {...props}
    />
  )
}
