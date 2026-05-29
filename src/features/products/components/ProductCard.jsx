import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Plus, Star } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Tooltip } from "@/components/ui/Tooltip"
import { useCart } from "@/context/useCart"
import { formatPrice, cn } from "@/lib/utils"

export function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()

  const badgeVariant =
    product.badge === "Low stock"
      ? "destructive"
      : product.badge === "New"
        ? "success"
        : "solid"

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link to={`/product/${product.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="aspect-square overflow-hidden bg-secondary/40">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>

          {product.badge && (
            <div className="absolute left-3 top-3">
              <Badge variant={badgeVariant}>{product.badge}</Badge>
            </div>
          )}

          <Tooltip content="Add to cart" side="left">
            <button
              onClick={(e) => {
                e.preventDefault()
                addItem(product)
              }}
              aria-label={`Add ${product.name} to cart`}
              className={cn(
                "absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full",
                "bg-primary text-primary-foreground shadow-md transition-all duration-300",
                "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                "hover:scale-105 active:scale-95",
              )}
            >
              <Plus size={18} />
            </button>
          </Tooltip>
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-foreground">
              {product.name}
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <Star size={12} className="fill-foreground text-foreground" />
              {product.rating}
              <span className="text-muted-foreground/60">
                ({product.reviews})
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
            {product.compareAt && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-square animate-pulse rounded-2xl bg-muted" />
      <div className="mt-3 flex justify-between">
        <div className="space-y-2">
          <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-3.5 w-12 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
