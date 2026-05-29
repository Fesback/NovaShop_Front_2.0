import { useMemo, useState } from "react"
import { AuthContext } from "./useAuth"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login: ({ email, name }) =>
        setUser({ name: name || email.split("@")[0], email }),
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}