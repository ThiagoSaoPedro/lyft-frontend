import { LogOut, Plus, Users, CalendarDays, Home, Dumbbell, User, MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

//* Components imports
import { useAuth } from "@/components/auth-provider"

//* Hooks imports
import { useNotification } from "@/context/notification-context"

export function Sidebar() {
    //* HOOKS * //
    const { user, logout } = useAuth()
    const { confirm } = useNotification()
    const pathname = usePathname()

    //* CONSTANTS * //
    const canCreate = user?.role === "personal" || user?.role === "user"

    const navItems = [
        { label: "Home", icon: Home, href: "/home" },
        { label: "Planejamento", icon: CalendarDays, href: "/kanban" },
        { label: "Treinos", icon: Dumbbell, href: "/workouts" },
        ...(user?.role === "personal" ? [{ label: "Alunos", icon: Users, href: "/students" }] : []),
        { label: "Perfil", icon: User, href: "/profile" },
        { label: "Feedback", icon: MessageSquare, href: "/feedback" },
    ]

    return (
        <aside
            className="w-64 border-r border-white/5 bg-black/40 flex flex-col pt-10 pb-8 h-[100vh] sticky top-0 overflow-y-auto shrink-0 z-40"
            id="main-sidebar"
        >
            <div className="px-8 mb-12 flex items-center gap-3" id="sidebar-header">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter uppercase text-white">
                    Lyft
                </span>
            </div>

            <nav className="flex-1 px-4 space-y-2" id="sidebar-nav">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href === "/home" && pathname === "/")
                    return (
                        <Link
                            key={item.href}
                            id={`sidebar-link-${item.label.toLowerCase()}`}
                            href={item.href}
                            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${isActive
                                ? "bg-primary text-white shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                                : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-gray-600 group-hover:text-white"}`} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="px-4 mt-auto">
                <button
                    id="sidebar-logout-button"
                    onClick={() =>
                        confirm({
                            title: "Encerrar Sessão",
                            message: "Deseja realmente sair da plataforma agora?",
                            type: "info",
                            confirmLabel: "Sair",
                            onConfirm: logout,
                        })
                    }
                    className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all text-left group border border-transparent"
                >
                    <LogOut className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    Sair
                </button>
            </div>
        </aside>
    )
}
