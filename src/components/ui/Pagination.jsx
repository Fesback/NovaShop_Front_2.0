import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - 1 && i <= page + 1)
    ) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…")
    }
  }

  const navBtn =
    "flex h-9 min-w-9 items-center justify-center rounded-lg border border-border px-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none hover:bg-secondary"

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        className={navBtn}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-1.5 text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              navBtn,
              p === page &&
                "bg-primary text-primary-foreground border-primary hover:bg-primary",
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        className={navBtn}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}
