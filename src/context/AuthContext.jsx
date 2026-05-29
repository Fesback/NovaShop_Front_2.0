import { useMemo, useState } from "react"
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from "./useAuth"

export function AuthProvider({ children }) {
  
  const normalizeRole = (role) => {
    if (!role) return 'user'
    return role.replace('ROLE_', '').toLowerCase()
  }

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        return {
          email: decoded.sub,
          name: decoded.sub.split('@')[0],
          role: normalizeRole(decoded.authorities?.[0])
        }
      } catch (error) {
        console.error("Token inicial inválido o expirado:", error)
        localStorage.removeItem('token')
        return null
      }
    }
    return null
  })

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading: false, 
      login: (token) => {
        localStorage.setItem('token', token)
        const decoded = jwtDecode(token)
        setUser({
          email: decoded.sub,
          role: normalizeRole(decoded.authorities?.[0])
        })
      },
      logout: () => {
        localStorage.removeItem('token')
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}