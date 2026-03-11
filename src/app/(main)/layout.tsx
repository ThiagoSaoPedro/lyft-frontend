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
                <div className="flex-1" id="dashboard-children-container">
                    {children}
                </div>
            </main>
        </div>
    )
}
