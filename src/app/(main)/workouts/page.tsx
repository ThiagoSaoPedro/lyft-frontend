"use client"

//* Libraries imports
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    Dumbbell,
    Plus,
    Trash2,
    Edit3,
    Eye,
    ArrowLeft,
} from "lucide-react"
import Link from "next/link"

//* Hooks imports
import { useAuth } from "@/components/auth-provider"
import { useNotification } from "@/context/notification-context"

//* Lib imports
import { api } from "@/lib/api"

export default function MyWorkouts() {
    //* HOOKS * //
    const { user } = useAuth()
    const { notify, confirm } = useNotification()
    const [workouts, setWorkouts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [viewingWorkout, setViewingWorkout] = useState<any | null>(null)

    useEffect(() => {
        fetchWorkouts()
    }, [])

    //* ACTIONS * //
    const fetchWorkouts = async () => {
        try {
            const data: any = await api.get("/workouts")
            setWorkouts(data.data || [])
        } catch (e) {
            notify({
                title: "Erro de Conexao",
                message: "Falha ao carregar seus treinos.",
                type: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async (id: number) => {
        confirm({
            title: "Remover Plano",
            message: "Tem certeza que deseja excluir este treino permanentemente?",
            type: "warning",
            confirmLabel: "Excluir",
            cancelLabel: "Manter",
            onConfirm: async () => {
                try {
                    await api.delete(`/workouts/${id}`)
                    fetchWorkouts()
                    notify({
                        title: "Sucesso",
                        message: "Plano de treino removido.",
                        type: "success",
                    })
                } catch (e: any) {
                    notify({
                        title: "Erro",
                        message: e.message || "Nao foi possivel excluir o treino.",
                        type: "error",
                    })
                }
            },
        })
    }

    if (viewingWorkout) {
        return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8" id="workout-view-container">
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => setViewingWorkout(null)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all text-xs font-bold uppercase"
                        id="workout-view-back-button"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                    <div className="flex items-center gap-3">
                        {(user?.role === "personal" || user?.role === "user") && (
                            <Link
                                href={`/workouts/new?edit=${viewingWorkout.id}`}
                                id="workout-view-edit-link"
                                className="p-4 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest px-8 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                            >
                                Editar Plano
                            </Link>
                        )}
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent" id="workout-details-card">
                    <div className="mb-8">
                        <h3 className="text-3xl font-black italic tracking-tighter text-primary uppercase" id="workout-details-title">{viewingWorkout.title}</h3>
                        {viewingWorkout.description && (
                            <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-2xl" id="workout-details-desc">{viewingWorkout.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6" id="workout-exercises-grid">
                        {viewingWorkout.exercises.map((ex: any, idx: number) => (
                            <div key={idx} className="p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col md:flex-row gap-6" id={`workout-exercise-item-${idx}`}>
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-sm">
                                    #{idx + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{ex.name}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {ex.sets_config.map((set: any, sIdx: number) => (
                                            <div key={sIdx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
                                                <div className={`text-[8px] font-black uppercase tracking-widest ${set.type === 'warmup' ? 'text-blue-400' :
                                                    set.type === 'work' ? 'text-primary' :
                                                        set.type === 'dropset' ? 'text-orange-400' : 'text-green-400'
                                                    }`}>
                                                    {set.type}
                                                </div>
                                                <div className="text-lg font-black text-white">
                                                    {set.count} <span className="text-[10px] font-normal text-gray-400 italic">sets x</span> {set.reps} <span className="text-[10px] font-normal text-gray-400 italic">reps</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8" id="workouts-page-root">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-2 uppercase">
                    <Dumbbell className="w-6 h-6 text-primary" />
                    MEUS TREINOS
                </h3>
                {(user?.role === "personal" || user?.role === "user") && (
                    <Link
                        href="/workouts/new"
                        id="create-new-workout-link"
                        className="px-6 py-2.5 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                    >
                        + NOVO PLANO
                    </Link>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64" id="workouts-loading-spinner">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="workouts-list-grid">
                    {workouts.map((w) => (
                        <div key={w.id} id={`workout-card-${w.id}`} className="glass-card p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all flex flex-col gap-4 group">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xl font-bold tracking-tight">{w.title}</h4>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all" id={`workout-card-actions-${w.id}`}>
                                    {(user?.role === "personal" || user?.role === "user") && (
                                        <>
                                            <Link
                                                href={`/workouts/new?edit=${w.id}`}
                                                id={`workout-edit-btn-${w.id}`}
                                                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-primary transition-all"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                id={`workout-delete-btn-${w.id}`}
                                                onClick={() => onDelete(w.id)}
                                                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-500 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                {w.exercises?.map((ex: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between text-xs text-gray-400 p-2 rounded-lg bg-white/2 border border-white/5">
                                        <span className="font-bold text-white capitalize">{ex.name}</span>
                                        <span className="opacity-60">{ex.sets_config?.length} blocos</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                id={`workout-view-details-btn-${w.id}`}
                                onClick={() => setViewingWorkout(w)}
                                className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all mt-auto flex items-center justify-center gap-2"
                            >
                                <Eye className="w-3 h-3" /> VER DETALHES
                            </button>
                        </div>
                    ))}
                    {workouts.length === 0 && (
                        <div className="col-span-full py-20 text-center glass-card rounded-3xl border border-dashed border-white/10" id="workouts-empty-state">
                            <div className="text-gray-500 font-bold uppercase tracking-widest mb-2">Nenhum treino cadastrado</div>
                            <p className="text-gray-600 text-sm">Clique em Novo Plano para comear a sua jornada.</p>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    )
}
