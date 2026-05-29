export const posts = [
  {
    slug: "the-case-for-fewer-better-things",
    title: "The case for fewer, better things",
    excerpt:
      "Why a smaller, more considered collection of objects can change the way a space feels — and the way you move through it.",
    cover: "/blog/design.png",
    category: "Design",
    author: "Maya Lindqvist",
    role: "Head of Design",
    date: "April 12, 2025",
    readingTime: "6 min read",
    content: [
      "We tend to think that more options make us happier. In practice, the opposite is often true. A drawer with three objects you love is calmer than a drawer with thirty you tolerate.",
      "When we design a product, we start by removing. What can this object do without? What is the single job it needs to do well? The answers shape everything from the materials to the finish.",
      "Fewer, better things ask more of us up front and less of us over time. They are the quiet backdrop to a good day, not the noise.",
      "That is the philosophy behind everything we make at NovaShop: objects worth keeping, designed to disappear into your routine.",
    ],
  },
  {
    slug: "materials-that-age-well",
    title: "Materials that age well",
    excerpt:
      "A short guide to the materials we choose, and why patina is a feature, not a flaw.",
    cover: "/blog/materials.png",
    category: "Materials",
    author: "Tomás Herrera",
    role: "Materials Lead",
    date: "March 28, 2025",
    readingTime: "4 min read",
    content: [
      "The best materials do not stay new. They take on the marks of use and become more yours over time. Oak softens. Leather darkens. Wool relaxes.",
      "We avoid finishes that try to freeze an object in time. A coating that hides wear usually hides quality too.",
      "When you choose materials that age well, repair becomes possible and replacement becomes rare. That is better for you and better for the planet.",
    ],
  },
  {
    slug: "inside-the-workshop",
    title: "Inside the workshop",
    excerpt:
      "A look at how a NovaShop product moves from a sketch to the object on your desk.",
    cover: "/blog/craft.png",
    category: "Craft",
    author: "Priya Anand",
    role: "Operations",
    date: "March 9, 2025",
    readingTime: "5 min read",
    content: [
      "Every product begins as a problem and a constraint. The problem is usually small and specific. The constraint is almost always restraint.",
      "From there it becomes a sketch, then a rough prototype, then a dozen prototypes that quietly disagree with each other until one wins.",
      "Only once a design earns its place do we think about scale. The goal is never to make more — it is to make the right thing, and make it well.",
    ],
  },
]

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms))

export async function fetchPosts() {
  await delay()
  return posts
}

export async function fetchPostBySlug(slug) {
  await delay()
  return posts.find((p) => p.slug === slug) || null
}
