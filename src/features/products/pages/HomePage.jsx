import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Sparkles } from "lucide-react"
import { Container } from "@/components/Brand"
import { Button } from "@/components/ui/Button"
import { ProductCard, ProductCardSkeleton } from "@/features/products/components/ProductCard"
import { useProducts } from "@/features/products/hooks/useProducts"
import { categories } from "@/features/products/services/products"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <Sparkles size={13} />
            New season, fewer things
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Objects worth keeping.
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground"
          >
            A curated collection of premium essentials, designed to be quietly
            useful and built to last. No clutter, no noise — just better things.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <Link to="/catalog">
                Shop the collection
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/catalog">Browse categories</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-secondary/40">
            <img
              src="/hero.png"
              alt="A calm modern interior with premium minimalist objects"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-border bg-card p-4 shadow-lg sm:block">
            <p className="text-2xl font-semibold tracking-tight">4.8/5</p>
            <p className="text-xs text-muted-foreground">from 12,400+ reviews</p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

const valueProps = [
  { icon: Truck, title: "Free shipping", text: "On all orders over $250." },
  { icon: RotateCcw, title: "30-day returns", text: "No questions asked." },
  { icon: ShieldCheck, title: "2-year warranty", text: "On every product." },
  { icon: Sparkles, title: "Carbon neutral", text: "Every order, offset." },
]

function ValueProps() {
  return (
    <section className="border-b border-border">
      <Container className="grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
        {valueProps.map((v) => (
          <div key={v.title} className="flex items-start gap-3 py-8 pr-6">
            <v.icon size={20} className="mt-0.5 shrink-0 text-foreground" />
            <div>
              <p className="text-sm font-medium">{v.title}</p>
              <p className="text-xs text-muted-foreground">{v.text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}

function SectionHeading({ eyebrow, title, to, linkLabel }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {to && (
        <Link
          to={to}
          className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          {linkLabel}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}

function FeaturedProducts() {
  const { data, isLoading } = useProducts()
  const featured = (data || []).slice(0, 4)

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Featured"
          title="This week's edit"
          to="/shop"
          linkLabel="View all"
        />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Container>
    </section>
  )
}

function CategoryShowcase() {
  return (
    <section className="border-t border-border py-20">
      <Container>
        <SectionHeading eyebrow="Browse" title="Shop by category" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <Link
                to={`/category/${c.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/30"
              >
                <div>
                  <h3 className="text-lg font-medium tracking-tight">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.description}
                  </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function EditorialCTA() {
  return (
    <section className="pb-4">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-surface px-8 py-16 text-center text-surface-foreground sm:px-16 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Designed once. Used every day.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-surface-foreground/70">
            Discover the pieces that quietly make your space, and your day, a
            little better.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link to="/shop">
                Start shopping
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedProducts />
      <CategoryShowcase />
      <EditorialCTA />
    </>
  )
}
