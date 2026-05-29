import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@/components/Brand';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { posts, fetchPostBySlug } from '../services/blog';

function BlogCard({ post, featured = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <motion.article
        whileHover={{ y: -4 }}
        className={`bg-card border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-lg ${
          featured ? 'md:flex' : ''
        }`}
      >
        <div
          className={`aspect-video bg-muted/10 overflow-hidden ${
            featured ? 'md:w-1/2 md:aspect-auto md:h-auto' : ''
          }`}
        >
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className={`p-6 ${featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center md:p-8' : ''}`}>
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>
          <h2
            className={`font-semibold text-foreground group-hover:text-accent transition-colors mb-2 ${
              featured ? 'text-2xl' : 'text-lg'
            }`}
          >
            {post.title}
          </h2>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center text-sm font-medium text-foreground">
              {post.author.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="text-foreground font-medium">{post.author}</p>
              <p className="text-muted-foreground text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export function BlogListPage() {
  const { data: blogList = [], isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: () => Promise.resolve(posts),
  });

  const blogPosts = blogList;

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-card">
        <Container className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              The Journal
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Stories about design, craftsmanship, and the art of mindful living.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-12">
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-96 rounded-xl" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-80 rounded-xl" />
              <Skeleton className="h-80 rounded-xl" />
            </div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <BlogCard post={featured} featured />
              </motion.div>
            )}

            {/* Post Grid */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchPostBySlug(slug),
  });

  const relatedPosts = useMemo(
    () =>
      blogPosts
        .filter((p) => p.slug !== slug && p.category === post?.category)
        .slice(0, 2),
    [slug, post?.category]
  );

  if (isLoading) {
    return (
      <Container className="py-12 max-w-3xl">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-12 w-2/3 mb-8" />
        <Skeleton className="h-96 rounded-xl mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          Article not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The article you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link to="/blog">
          <motion.span
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-accent"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Journal
          </motion.span>
        </Link>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Journal
          </Link>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">{post.category}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center text-lg font-medium text-foreground">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-video bg-card rounded-2xl overflow-hidden border border-border mb-12"
          >
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-neutral dark:prose-invert max-w-none"
          >
            <div className="text-foreground leading-relaxed space-y-6">
              {Array.isArray(post.content) ? (
                post.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p>{post.content}</p>
              )}
            </div>
          </motion.div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-3xl mx-auto mt-16 pt-12 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-foreground">
                Related Articles
              </h2>
              <Link
                to="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
