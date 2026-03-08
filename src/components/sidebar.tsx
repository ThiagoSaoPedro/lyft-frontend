"use client"

//* Libraries imports
import { LogOut, Plus, Settings, Users, CalendarDays, LayoutDashboard, Dumbbell as DumbbellIcon, Dumbbell } from "lucide-react"
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
    const canViewMine = user?.role === "student" || user?.role === "user"

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Planejamento", icon: CalendarDays, href: "/dashboard/kanban" },
        { label: "Treinos", icon: Dumbbell, href: "/dashboard/workouts" },
        ...(user?.role === "personal" ? [{ label: "Alunos", icon: Users, href: "/dashboard/students" }] : []),
        { label: "Configuracoes", icon: Settings, href: "/dashboard/settings" },
    ]

    return (
        <aside
            className="w-64 border-r border-white/5 bg-black/20 flex flex-col pt-8 pb-4 h-full sticky top-0 overflow-y-auto"
            id="main-sidebar"
        >
            <div className="px-8 mb-10 flex items-center gap-3" id="sidebar-header">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                    <DumbbellIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                    Lyft
                </span>
            </div>

            <nav className="flex-1 px-4 space-y-1.5" id="sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        id={`sidebar-link-${item.label.toLowerCase()}`}
                        href={item.href}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${pathname === item.href
                            ? "bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="px-4 mt-auto">
                <button
                    id="sidebar-logout-button"
                    onClick={() =>
                        confirm({
                            title: "Encerrar Sessao",
                            message: "Deseja realmente sair da plataforma agora?",
                            type: "info",
                            confirmLabel: "Sair",
                            onConfirm: logout,
                        })
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all text-left"
                >
                    <LogOut className="w-5 h-5" />
                    Sair
                </button>
            </div>
        </aside>
    )
}
