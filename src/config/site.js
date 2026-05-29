export const siteConfig = {
  name: "NovaShop",
  tagline: "Designed for the everyday.",
  description:
    "A premium, minimalist marketplace for objects worth keeping. Curated design, clean lines, fast checkout.",
  email: "hello@novashop.com",
  phone: "+1 (415) 555-0117",
  address: "548 Market Street, San Francisco, CA",
}

export const mainNav = [
  { label: "Shop", to: "/catalog" },
  { label: "Categories", to: "/catalog" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
]

export const footerNav = [
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/catalog" },
      { label: "Audio", to: "/category/audio" },
      { label: "Furniture", to: "/category/furniture" },
      { label: "Accessories", to: "/category/accessories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", to: "/contact" },
      { label: "Shipping", to: "/contact" },
      { label: "Returns", to: "/contact" },
      { label: "Warranty", to: "/contact" },
    ],
  },
]

export const adminNav = [
  { label: "Dashboard", to: "/admin", icon: "LayoutDashboard" },
  { label: "Products", to: "/admin/products", icon: "Package" },
  { label: "Categories", to: "/admin/categories", icon: "Tags" },
  { label: "Orders", to: "/admin/orders", icon: "ShoppingBag" },
  { label: "Customers", to: "/admin/customers", icon: "Users" },
  { label: "Analytics", to: "/admin/analytics", icon: "BarChart3" },
  { label: "Settings", to: "/admin/settings", icon: "Settings" },
]
