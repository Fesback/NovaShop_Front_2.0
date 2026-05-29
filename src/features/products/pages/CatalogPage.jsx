import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Container } from '@/components/Brand';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { categories } from '../services/products';

const ITEMS_PER_PAGE = 6;

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: products = [], isLoading } = useProducts();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    if (updates.category !== undefined || updates.q !== undefined) {
      params.delete('page');
    }
    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (currentCategory) {
      result = result.filter((p) => p.category === currentCategory);
    }
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (currentSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [products, currentCategory, currentSearch, currentSort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeFilters = [currentCategory, currentSearch].filter(Boolean).length;

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
              Shop All Products
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Discover our curated collection of premium essentials designed for modern living.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-8 md:py-12">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={currentSearch}
                onChange={(e) => updateParams({ q: e.target.value || null })}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="relative"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFilters > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-background text-xs flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {filtered.length} product{filtered.length !== 1 && 's'}
            </span>
            <div className="relative">
              <select
                value={currentSort}
                onChange={(e) => updateParams({ sort: e.target.value })}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Categories</h3>
                  {(currentCategory || currentSearch) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateParams({ category: null, q: null })}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!currentCategory ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => updateParams({ category: null })}
                  >
                    All
                  </Badge>
                  {categories.map((cat) => (
                    <Badge
                      key={cat.slug}
                      variant={currentCategory === cat.slug ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => updateParams({ category: cat.slug })}
                    >
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Pills */}
        {(currentCategory || currentSearch) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {currentCategory && (
              <Badge variant="secondary" className="gap-1">
                {categories.find((c) => c.slug === currentCategory)?.name}
                <button onClick={() => updateParams({ category: null })}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {currentSearch && (
              <Badge variant="secondary" className="gap-1">
                "{currentSearch}"
                <button onClick={() => updateParams({ q: null })}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No products found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={
              <Button onClick={() => updateParams({ category: null, q: null })}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {paginated.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => updateParams({ page: String(page) })}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
