"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { Users, Search, MessageSquare } from "lucide-react"

//* Hooks imports
import { useAuth } from "@/components/auth-provider"

export default function StudentsPage() {
    //* HOOKS * //
    const { user } = useAuth()

    if (user?.role !== 'personal') {
        return <div className="p-20 text-center" id="students-access-restricted">Acesso restrito para treinadores.</div>
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8" id="students-page-root">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-2 uppercase">
                    <Users className="w-6 h-6 text-primary" />
                    GESTO DE ALUNOS
                </h3>
                <button
                    id="invite-atleta-button"
                    className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                    + CONVIDAR ATLETA
                </button>
            </div>

            <div className="relative" id="students-search-container">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                    id="students-search-input"
                    type="text"
                    placeholder="Buscar pelo nome ou ID do atleta..."
                    className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white/5 border border-white/10 outline-none focus:border-primary/50 text-sm font-bold"
                />
            </div>

            <div className="grid grid-cols-1 gap-4" id="students-list-grid">
                {[1, 2].map((_, i) => (
                    <div key={i} id={`student-item-${i}`} className="glass-card p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/40 transition-all flex flex-col md:flex-row items-center gap-6 group">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-primary text-xl">
                            {i === 0 ? "JD" : "AM"}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-xl font-bold tracking-tight mb-1">{i === 0 ? "John Doe" : "Alice Miller"}</h4>
                            <div className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Atleta Pro  ID: {i + 2}</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button id={`student-message-${i}`} className="p-4 rounded-2xl bg-white/5 text-gray-400 hover:text-white transition-all">
                                <MessageSquare className="w-5 h-5" />
                            </button>
                            <button id={`student-view-dashboard-${i}`} className="px-8 py-3 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
                                Ver Dashboard
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-10 text-center glass-card rounded-3xl border border-dashed border-white/10" id="students-mediapipe-disclaimer">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Base de Dados Sincronizada com Mediapipe</p>
            </div>
        </motion.div>
    )
}
