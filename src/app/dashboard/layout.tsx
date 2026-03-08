"use client"

//* Libraries imports
import { useAuth } from "@/components/auth-provider"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    //* HOOKS * //
    const { user } = useAuth()

    return (
        <div className="flex min-h-screen bg-[#09090b] text-white selection:bg-primary/30" id="dashboard-layout-root">
            <Sidebar />
            <main className="flex-1 flex flex-col p-10 overflow-auto" id="dashboard-main-content">
                <header className="flex items-center justify-between mb-12" id="dashboard-header">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white shadow-sm ring-white/5" id="dashboard-header-title">
                            Performance System
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm font-medium" id="dashboard-user-info">
                            Logado como <span className="text-primary">{user?.name}</span> ({user?.role})
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-primary" id="dashboard-user-avatar">
                        {user?.name?.substring(0, 2).toUpperCase()}
                    </div>
                </header>

                <div className="flex-1" id="dashboard-children-container">
                    {children}
                </div>
            </main>
        </div>
    )
}
