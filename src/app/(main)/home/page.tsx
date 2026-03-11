"use client"

//* Libraries imports
import { motion, AnimatePresence } from "framer-motion"
import {
    Target,
    Calendar,
    Zap,
    Flame,
    Dumbbell,
    ChevronRight,
    PlayCircle,
    CheckCircle2,
    History,
    Plus,
    ArrowRight,
    Sparkles,
    CalendarDays
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export default function HomePage() {
    //* HOOKS * //
    const { user } = useAuth()
    const [progress, setProgress] = useState(0)
    const [showFABActions, setShowFABActions] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(0.68), 500)
        return () => clearTimeout(timer)
    }, [])

    //* MOCKED DATA * //
    const workouts = [
        { id: 1, title: "Peito e Tríceps", type: "Hipertrofia", duration: "55min", intensity: "Alta", color: "from-violet-500/20" },
        { id: 2, title: "Leg Day A", type: "Força", duration: "65min", intensity: "Extrema", color: "from-blue-500/20" },
        { id: 3, title: "Cardio Hit", type: "Resistência", duration: "25min", intensity: "Média", color: "from-emerald-500/20" },
    ]

    const historyItems = [
        { id: 1, title: "Costas e Bíceps", date: "Ontem", duration: "52 min", xp: "+480", color: "text-orange-500", bg: "bg-orange-500/10" },
        { id: 2, title: "Ombros e Trapézio", date: "05 de Março", duration: "48 min", xp: "+420", color: "text-blue-500", bg: "bg-blue-500/10" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen pb-24"
            id="home-page-container"
        >
            {/* Header / Greeting */}
            <div className="mb-10 flex items-end justify-between px-2">
                <div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                        Olá, {user?.name?.split(' ')[0]} <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    </h2>
                    <p className="text-muted-foreground mt-2 font-medium">Você já completou <span className="text-primary font-bold">2/3</span> das atividades hoje. Mantenha o foco!</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 bg-white/5 py-2 px-4 rounded-full border border-white/5">
                    <CalendarDays className="w-3 h-3" />
                    {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
            </div>

            {/* Barra de Progresso do Dia */}
            <section id="daily-progress" className="glass-card mb-12 p-10 rounded-[40px] border border-white/5 bg-gradient-to-br from-primary/10 via-transparent to-transparent relative overflow-hidden group">
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] italic text-primary mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Progresso Diário
                        </h3>
                        <p className="text-2xl font-black italic tracking-tighter text-white uppercase">Sua meta está próxima</p>
                    </div>
                    <div className="text-right">
                        <span className="text-5xl font-black italic tracking-tighter text-primary group-hover:scale-110 transition-transform inline-block">
                            {Math.round(progress * 100)}%
                        </span>
                    </div>
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative z-10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-primary to-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.6)]"
                    />
                </div>

                {/* Background Decor */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Coluna Principal */}
                <div className="lg:col-span-8 space-y-12">

                    {/* Meus Treinos */}
                    <section id="my-workouts" className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Dumbbell className="w-4 h-4" />
                                Meus Treinos
                            </h4>
                            <Link href="/workouts" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group">
                                Ver todos <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {workouts.map((workout) => (
                                <div
                                    key={workout.id}
                                    className={`glass-card p-6 rounded-3xl border border-white/5 bg-gradient-to-br ${workout.color} to-transparent hover:border-primary/40 transition-all group overflow-hidden relative`}
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="p-3 rounded-xl bg-primary/20 text-primary">
                                            <Zap className="w-5 h-5" fill="currentColor" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                                            {workout.type}
                                        </span>
                                    </div>
                                    <h5 className="text-lg font-black italic uppercase tracking-tighter text-white mb-1 group-hover:text-primary transition-colors">{workout.title}</h5>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-6">{workout.duration} • {workout.intensity}</p>

                                    <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-primary group-hover:border-primary transition-all">
                                        <PlayCircle className="w-4 h-4" />
                                        Iniciar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Histórico Recente */}
                    <section id="recent-history" className="space-y-6">
                        <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-2">
                            <History className="w-4 h-4" />
                            Atividades Recentes
                        </h4>
                        <div className="space-y-3">
                            {historyItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group cursor-default">
                                    <div className="flex items-center gap-5">
                                        <div className={`p-3 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                                            <Flame className="w-5 h-5" fill="currentColor" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black uppercase italic text-white">{item.title}</p>
                                            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">{item.date} • {item.duration}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-primary font-black text-xs uppercase tracking-[0.2em]">{item.xp} XP</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Coluna Lateral (Schedule) */}
                <div className="lg:col-span-4 space-y-8">
                    <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-2">
                        <Calendar className="w-4 h-4" />
                        O que temos para hoje?
                    </h4>

                    <div className="glass-card p-8 rounded-[40px] border border-white/5 bg-black/20 relative">
                        <div className="space-y-10 relative z-10">
                            {/* Kanban Event */}
                            <div className="flex gap-6 opacity-40 grayscale">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 border border-green-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <div className="w-[1px] h-14 bg-white/5 mt-2" />
                                </div>
                                <div className="pt-1">
                                    <p className="text-[9px] font-black text-green-500 uppercase tracking-widest">09:00 - CONCLUÍDO</p>
                                    <p className="text-gray-300 text-sm font-bold mt-1 uppercase tracking-tight">Kanban: Meta Diária</p>
                                </div>
                            </div>

                            {/* Main Training Event */}
                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-primary/5 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                                        <PlayCircle className="w-4 h-4" />
                                    </div>
                                    <div className="w-[1px] h-20 bg-white/5 mt-2" />
                                </div>
                                <div className="pt-0">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest animate-pulse">18:30 - AGORA</p>
                                    <p className="text-white text-xl font-black italic uppercase tracking-tighter mt-1">Treino: Peito e Tríceps</p>
                                    <p className="text-gray-500 text-[11px] mt-3 leading-relaxed font-medium">Foco em falha concêntrica no supino. Não esqueça do magnésio.</p>
                                </div>
                            </div>

                            {/* Future Event */}
                            <div className="flex gap-6 opacity-30">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 border border-white/5">
                                        <CalendarDays className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Amanhã</p>
                                    <p className="text-gray-600 text-sm font-bold mt-1 uppercase tracking-tight">Leg Day B (Fibras)</p>
                                </div>
                            </div>
                        </div>

                        {/* Motivational Box */}
                        <div className="mt-12 p-6 rounded-3xl bg-primary/5 border border-primary/10">
                            <p className="text-xs text-primary font-black uppercase tracking-widest mb-2 italic">Dica IA de hoje:</p>
                            <p className="text-gray-400 text-[11px] leading-relaxed italic">"A consistência é mais importante que a intensidade. Hoje é o dia #12 da sua melhor sequência."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAB - Sticky Bottom Right */}
            <div className="fixed bottom-10 right-10 z-50">
                <AnimatePresence>
                    {showFABActions && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            className="absolute bottom-20 right-0 space-y-4 items-end flex flex-col min-w-[200px]"
                        >
                            <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap shadow-2xl hover:bg-primary hover:text-white transition-all">
                                <Dumbbell className="w-4 h-4" /> Novo Treino
                            </button>
                            <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap shadow-2xl hover:bg-primary hover:text-white transition-all">
                                <Plus className="w-4 h-4" /> Adicionar Cardio
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setShowFABActions(!showFABActions)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all ${showFABActions ? 'bg-zinc-800 rotate-45' : 'bg-primary hover:shadow-primary/50 hover:scale-110'}`}
                >
                    <Plus className="w-8 h-8" />
                </button>
            </div>
        </motion.div>
    )
}
