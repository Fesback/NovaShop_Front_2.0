export const categories = [
  { slug: "audio", name: "Audio", description: "Sound, refined." },
  { slug: "wearables", name: "Wearables", description: "Time, well kept." },
  { slug: "lighting", name: "Lighting", description: "Light with intent." },
  { slug: "furniture", name: "Furniture", description: "Comfort by design." },
  { slug: "accessories", name: "Accessories", description: "The finishing details." },
]

export const products = [
  {
    id: "p1",
    slug: "aero-wireless-headphones",
    name: "Aero Wireless Headphones",
    category: "audio",
    price: 349,
    compareAt: 399,
    rating: 4.8,
    reviews: 214,
    stock: 18,
    badge: "Bestseller",
    image: "/products/headphones.png",
    short: "Active noise cancellation with 40-hour battery life.",
    description:
      "Aero pairs adaptive noise cancellation with a featherlight build, so you can stay focused for longer. Memory-foam cushions and a precision-tuned driver deliver a sound stage that feels effortless and natural.",
    highlights: [
      "Adaptive noise cancellation",
      "40-hour battery life",
      "Memory-foam ear cushions",
      "Multipoint Bluetooth 5.3",
    ],
    specs: {
      Driver: "40mm dynamic",
      Battery: "40 hours",
      Weight: "248g",
      Connectivity: "Bluetooth 5.3, USB-C",
    },
  },
  {
    id: "p2",
    slug: "meridian-watch",
    name: "Meridian Watch",
    category: "wearables",
    price: 289,
    rating: 4.7,
    reviews: 128,
    stock: 7,
    badge: "Low stock",
    image: "/products/watch.png",
    short: "A quiet, considered timepiece with a sapphire crystal.",
    description:
      "The Meridian is built around restraint. A brushed steel case, a matte black dial, and a soft-touch strap make it as comfortable in a meeting as it is on a weekend.",
    highlights: [
      "Sapphire crystal glass",
      "Swiss quartz movement",
      "50m water resistance",
      "Interchangeable strap",
    ],
    specs: {
      Case: "40mm brushed steel",
      Movement: "Swiss quartz",
      Glass: "Sapphire crystal",
      Water: "50m resistant",
    },
  },
  {
    id: "p3",
    slug: "arc-desk-lamp",
    name: "Arc Desk Lamp",
    category: "lighting",
    price: 159,
    rating: 4.9,
    reviews: 96,
    stock: 24,
    image: "/products/lamp.png",
    short: "Warm, dimmable light with an architectural silhouette.",
    description:
      "Arc brings focused, flicker-free light to any surface. The weighted base and friction joints hold any position, while the touch dimmer steps through five warm temperatures.",
    highlights: [
      "Five color temperatures",
      "Touch dimmer control",
      "Flicker-free LED",
      "Weighted matte base",
    ],
    specs: {
      Output: "650 lumens",
      Temp: "2700K–5000K",
      Power: "9W LED",
      Material: "Powder-coated steel",
    },
  },
  {
    id: "p4",
    slug: "haven-lounge-chair",
    name: "Haven Lounge Chair",
    category: "furniture",
    price: 899,
    compareAt: 1049,
    rating: 4.6,
    reviews: 54,
    stock: 5,
    badge: "Low stock",
    image: "/products/chair.png",
    short: "A sculpted lounge chair upholstered in soft wool.",
    description:
      "Haven is built for the long evenings. A sculpted shell, high-resilience foam, and solid oak legs make it as supportive as it is inviting.",
    highlights: [
      "High-resilience foam",
      "Solid oak legs",
      "Wool-blend upholstery",
      "Tool-free assembly",
    ],
    specs: {
      Frame: "Solid oak",
      Upholstery: "Wool blend",
      Dimensions: "76 × 78 × 84 cm",
      Weight: "14kg",
    },
  },
  {
    id: "p5",
    slug: "pulse-portable-speaker",
    name: "Pulse Portable Speaker",
    category: "audio",
    price: 129,
    rating: 4.5,
    reviews: 187,
    stock: 42,
    image: "/products/speaker.png",
    short: "Room-filling sound in a pocketable, rugged shell.",
    description:
      "Pulse delivers a surprising amount of low-end from a body that fits in one hand. Splash-proof and dust-resistant, it is ready for the kitchen, the shower, or the trail.",
    highlights: [
      "360° sound",
      "IP67 water resistant",
      "16-hour playback",
      "Stereo pairing",
    ],
    specs: {
      Output: "20W",
      Battery: "16 hours",
      Rating: "IP67",
      Weight: "540g",
    },
  },
  {
    id: "p6",
    slug: "field-leather-backpack",
    name: "Field Backpack",
    category: "accessories",
    price: 219,
    rating: 4.7,
    reviews: 73,
    stock: 16,
    badge: "New",
    image: "/products/backpack.png",
    short: "A clean everyday carry with a padded laptop bay.",
    description:
      "Field is the backpack that disappears into your routine. Water-repellent fabric, a 16-inch laptop bay, and a quick-access top pocket keep the essentials within reach.",
    highlights: [
      "Fits 16\" laptop",
      "Water-repellent shell",
      "Quick-access pocket",
      "Luggage pass-through",
    ],
    specs: {
      Capacity: "22L",
      Material: "Recycled nylon",
      Laptop: "Up to 16\"",
      Weight: "0.9kg",
    },
  },
  {
    id: "p7",
    slug: "terra-mug-set",
    name: "Terra Mug Set",
    category: "accessories",
    price: 48,
    rating: 4.8,
    reviews: 142,
    stock: 60,
    image: "/products/mug.png",
    short: "A pair of matte stoneware mugs, made to last.",
    description:
      "Terra is a set of two hand-finished stoneware mugs. The matte glaze and balanced handle make every cup feel a little more deliberate.",
    highlights: [
      "Set of two",
      "Hand-finished glaze",
      "Dishwasher safe",
      "350ml capacity",
    ],
    specs: {
      Material: "Stoneware",
      Capacity: "350ml each",
      Care: "Dishwasher safe",
      Set: "2 mugs",
    },
  },
  {
    id: "p8",
    slug: "vista-sunglasses",
    name: "Vista Sunglasses",
    category: "accessories",
    price: 165,
    rating: 4.6,
    reviews: 89,
    stock: 28,
    image: "/products/sunglasses.png",
    short: "Polarized lenses in a slim acetate frame.",
    description:
      "Vista keeps it simple: a slim matte frame, polarized lenses, and spring hinges that flex with you. UV400 protection comes standard.",
    highlights: [
      "Polarized lenses",
      "UV400 protection",
      "Spring hinges",
      "Italian acetate",
    ],
    specs: {
      Lens: "Polarized UV400",
      Frame: "Italian acetate",
      Fit: "Medium",
      Includes: "Case + cloth",
    },
  },
]

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms))

export async function fetchProducts() {
  await delay()
  return products
}

export async function fetchProductBySlug(slug) {
  await delay()
  return products.find((p) => p.slug === slug) || null
}

export async function fetchProductsByCategory(category) {
  await delay()
  return products.filter((p) => p.category === category)
}

export async function fetchRelated(product, count = 4) {
  await delay(400)
  if (!product) return []
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category))
    .slice(0, count)
}
