import { useState } from "react"
import { Link } from "react-router-dom"
import { Globe, MessageSquare, Code, ArrowRight, Check } from "lucide-react"
import { Logo, Container } from "@/components/Brand"
import { footerNav, siteConfig } from "@/config/site"

export function Footer() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
    setEmail("")
    setTimeout(() => setDone(false), 2500)
  }

  return (
    <footer className="mt-24 border-t border-border bg-background">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <form onSubmit={onSubmit} className="mt-6">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Join the newsletter
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="h-9 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/70"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform active:scale-95"
                >
                  {done ? <Check size={16} /> : <ArrowRight size={16} />}
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold">{col.title}</h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NovaShop. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {[Globe, MessageSquare, Code].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Social link"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
