import { lazy, Suspense, useEffect, Component } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { UserLayout } from '@/components/UserLayout';
import { AuthLayout } from '@/components/AuthLayout';
import { AdminLayout } from '@/components/AdminLayout'; 
import { UserProfileLayout } from '@/features/profile/layouts/UserProfileLayout';
import { useAuth } from '@/context';


class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('ErrorBoundary caught:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-foreground mb-2">Something went wrong</h1>
            <p className="text-muted-foreground mb-4">{this.state.error?.message}</p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}


const HomePage = lazy(() => import('@/features/products/pages/HomePage'));
const CatalogPage = lazy(() => import('@/features/products/pages/CatalogPage').then(m => ({ default: m.CatalogPage })));
const ProductDetailPage = lazy(() => import('@/features/products/pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('@/features/cart/pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('@/features/cart/pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const ConfirmationPage = lazy(() => import('@/features/cart/pages/ConfirmationPage').then(m => ({ default: m.ConfirmationPage })));

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));

const BlogListPage = lazy(() => import('@/features/blog/pages/BlogPage').then(m => ({ default: m.BlogListPage })));
const BlogPostPage = lazy(() => import('@/features/blog/pages/BlogPage').then(m => ({ default: m.BlogPostPage })));

const ContactPage = lazy(() => import('@/features/contact/pages/ContactPage').then(m => ({ default: m.ContactPage })));

const DashboardPage = lazy(() => import('@/features/admin/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const ProductsAdminPage = lazy(() => import('@/features/admin/pages/ProductsAdminPage').then(m => ({ default: m.ProductsAdminPage })));
const CategoriesAdminPage = lazy(() => import('@/features/admin/pages/CategoriesAdminPage').then(m => ({ default: m.CategoriesAdminPage })));
const OrdersAdminPage = lazy(() => import('@/features/admin/pages/OrdersAdminPage').then(m => ({ default: m.OrdersAdminPage })));
const CustomersAdminPage = lazy(() => import('@/features/admin/pages/CustomersAdminPage').then(m => ({ default: m.CustomersAdminPage })));
const SettingsAdminPage = lazy(() => import('@/features/admin/pages/SettingsAdminPage').then(m => ({ default: m.SettingsAdminPage })));

const ProfileInfoPage = lazy(() => import('@/features/profile/pages/ProfileInfoPage').then(m => ({ default: m.ProfileInfoPage })));
const UserOrdersPage = lazy(() => import('@/features/profile/pages/UserOrdersPage').then(m => ({ default: m.UserOrdersPage })));
const UserSettingsPage = lazy(() => import('@/features/profile/pages/UserSettingsPage').then(m => ({ default: m.UserSettingsPage })));


const AdminRoute = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/profile" replace />; // Redirige a usuarios normales
  
  return <Outlet />;
};


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center">Loading NovaShop...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            <Route element={<UserProfileLayout />}>
              <Route path="/profile" element={<ProfileInfoPage />} />
              <Route path="/profile/orders" element={<UserOrdersPage />} />
              <Route path="/profile/settings" element={<UserSettingsPage />} />
            </Route>
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Admin Routes Protegidas */}
          <Route element={<AdminRoute />}>
            {/* Anidamos el Layout dentro del Guardián */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<DashboardPage />} />
              <Route path="/admin/products" element={<ProductsAdminPage />} />
              <Route path="/admin/orders" element={<OrdersAdminPage />} />
              <Route path="/admin/categories" element={<CategoriesAdminPage />} />
              <Route path="/admin/customers" element={<CustomersAdminPage />} />
              <Route path="/admin/settings" element={<SettingsAdminPage />} />
            </Route>
          </Route>

          {/* ÚNICO Blindaje anti 404 global al final de TODAS las rutas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}