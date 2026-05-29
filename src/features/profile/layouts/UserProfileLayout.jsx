import { NavLink, Outlet } from 'react-router-dom';
import { User, Package, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context'; // Asumiendo que tienes tu hook de auth

const profileNav = [
  { name: 'My Profile', to: '/profile', icon: User, end: true },
  { name: 'My Orders', to: '/profile/orders', icon: Package, end: false },
  { name: 'Settings', to: '/profile/settings', icon: Settings, end: false },
];

export function UserProfileLayout() {
  const { logout } = useAuth(); // Lógica para cerrar sesión

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="flex flex-col gap-8 md:flex-row">
        
        {/* Sidebar de Navegación del Usuario */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="mb-8 px-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">My Account</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your orders and info.</p>
          </div>
          
          <nav className="flex flex-col space-y-1">
            {profileNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-foreground text-background shadow-sm" // Contraste minimalista activo
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )
                  }
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              );
            })}
            
            <div className="pt-4 mt-4 border-t border-border">
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Contenedor Principal donde cargarán las vistas */}
        <main className="flex-1 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
}