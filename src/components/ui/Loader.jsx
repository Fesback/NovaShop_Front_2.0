import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Loader({ size = 20, className }) {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin text-muted-foreground", className)}
      aria-hidden="true"
    />
  )
}

export function FullPageLoader({ label = "Loading" }) {
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3">
      <Loader size={28} />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
