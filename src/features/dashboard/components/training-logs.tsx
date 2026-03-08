"use client"

//* Libraries imports
import { Clock, Flame as BurnIcon } from "lucide-react"
import Link from "next/link"

export function TrainingLogs() {
    return (
        <div className="space-y-6" id="training-logs-container">
            <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                LOGS RECENTES
            </h3>
            <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                    <div
                        key={i}
                        id={`log-item-${i}`}
                        className="glass-card p-5 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all flex items-center gap-4 group"
                    >
                        <div className="p-3 rounded-2xl bg-white/2 border border-white/5 group-hover:bg-primary/10 transition-colors">
                            <BurnIcon className="w-5 h-5 text-gray-600 group-hover:text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-bold text-white mb-1">Peitoral & Ombro</div>
                            <div className="text-[10px] text-gray-600 font-medium">Concluido em 03/03 • 88% Precisao</div>
                        </div>
                        <div className="text-[10px] font-black text-primary">XP+450</div>
                    </div>
                ))}
                <Link
                    href="/dashboard/history"
                    className="block w-full text-center py-4 rounded-3xl border border-dashed border-white/10 text-[10px] font-black uppercase text-gray-500 hover:text-white hover:border-white/20 transition-all"
                    id="view-full-history-link"
                >
                    Ver Historico Completo
                </Link>
            </div>
        </div>
    )
}
