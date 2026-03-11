"use client"

//* Libraries imports
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

//* API imports
import { api } from "@/lib/api"

interface AuthContextType {
    user: any
    token: string | null
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    //* HOOKS * //
    const router = useRouter()
    const pathname = usePathname()
    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    //* CONSTANTS * //
    const publicRoutes = ["/login", "/signup", "/"]

    //* EFFECTS * //
    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")
        const isPublicRoute = publicRoutes.includes(pathname)

        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
            if (isPublicRoute && pathname !== "/") {
                router.push("/home")
            }
        } else if (!isPublicRoute) {
            router.push("/login")
        }

        setLoading(false)
    }, [pathname, router])

    //* ACTIONS * //
    const logout = async () => {
        try {
            // Opcional: chamar logout no backend
            await api.post("/logout").catch(() => { })
        } finally {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setToken(null)
            setUser(null)
            router.push("/login")
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, token, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within AuthProvider")
    return context
}
