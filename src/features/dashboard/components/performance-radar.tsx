"use client"

//* Libraries imports
import { LayoutDashboard, Navigation } from "lucide-react"
import Link from "next/link"

export function PerformanceRadar() {
    return (
        <div className="lg:col-span-2 space-y-6" id="performance-radar-container">
            <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6 text-primary" />
                PAINEL DE PERFORMANCE
            </h3>
            <div className="glass-card p-8 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent h-[400px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="text-center space-y-4 relative z-10">
                    <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                        <Navigation className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight uppercase">Radar de Evoluo</h4>
                    <p className="text-gray-500 text-sm max-w-sm">
                        Seus dados de Mediapipe e volumetria esto sendo processados para gerar seu grafico de
                        progresso semanal.
                    </p>
                    <Link
                        href="/dashboard/workouts"
                        id="radar-view-details-link"
                        className="inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all mt-4"
                    >
                        Ver Detalhes Completos
                    </Link>
                </div>
            </div>
        </div>
    )
}
