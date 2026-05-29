import { Outlet} from "react-router-dom"
import { Logo } from "@/components/Brand"
import miBanner from '@/assets/login-NS-dos.png';

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10">
        <Logo />
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NovaShop
        </p>
      </div>

      <div className="relative hidden overflow-hidden lg:block bg-muted/20">
        <img
          src={miBanner}
          alt="Novashop Banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
