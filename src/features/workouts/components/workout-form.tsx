"use client"

//* Libraries imports
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Layers, ArrowLeft, Save, Activity, Heart, Clock, Flame } from "lucide-react"
import { motion } from "framer-motion"

//* Components imports
import { ExerciseCard } from "./exercise-card"

//* Schemas imports
import { type WorkoutFields, workoutSchema } from "@/schemas/workout"

//* Types imports
import type { Workout } from "@/features/kanban/types"

//* Hooks imports
import { useAuth } from "@/components/auth-provider"
import { useNotification } from "@/context/notification-context"

//* Lib imports
import { api } from "@/lib/api"

export function WorkoutForm() {
    //* HOOKS * //
    const { user } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const editId = searchParams.get("edit")
    const [loading, setLoading] = useState(false)
    const { notify } = useNotification()

    const form = useForm<WorkoutFields>({
        resolver: zodResolver(workoutSchema) as any,
        defaultValues: {
            title: "",
            description: "",
            cardio_enabled: false,
            cardio_type: "minutes",
            cardio_duration_minutes: 0,
            cardio_calories: 0,
            exercises: [
                {
                    name: "",
                    sets_config: [{ type: "work", count: 3, reps: "10-12" }],
                },
            ],
        } as any,
    })

    const { fields, append, remove, insert } = useFieldArray({
        control: form.control,
        name: "exercises",
    })

    useEffect(() => {
        if (editId) {
            fetchWorkoutToEdit(editId)
        }
    }, [editId])

    //* ACTIONS * //
    const fetchWorkoutToEdit = async (id: string) => {
        try {
            const data = await api.get<{ data: Workout[] }>("/workouts")
            const workout = data.data.find((w) => w.id.toString() === id)

            if (workout) {
                form.setValue("title", workout.title)
                form.setValue("description", workout.description || "")
                form.setValue("student_id", workout.student_id ? workout.student_id.toString() : "")
                form.setValue("cardio_enabled", workout.cardio_enabled || false)
                form.setValue("cardio_type", workout.cardio_type || "minutes")
                form.setValue("cardio_duration_minutes", workout.cardio_duration_minutes)
                form.setValue("cardio_calories", workout.cardio_calories)
                form.setValue(
                    "exercises",
                    workout.exercises.map((ex) => ({
                        name: ex.name,
                        sets_config: ex.sets_config,
                    })),
                )
            }
        } catch (e) { }
    }

    const duplicateExercise = (index: number) => {
        const currentValues = form.getValues(`exercises.${index}`)
        insert(index + 1, JSON.parse(JSON.stringify(currentValues)))
    }

    const onSubmit = async (data: WorkoutFields) => {
        if (!user) return

        setLoading(true)
        const payload = user.role !== "personal" ? { ...data, student_id: user.id.toString() } : data
        const endpoint = editId ? `/workouts/${editId}` : "/workouts"
        const method = editId ? "put" : "post"

        try {
            await (api as any)[method](endpoint, payload)

            notify({
                title: "Sucesso",
                message: editId
                    ? "Plano de treino atualizado com sucesso!"
                    : "Novo plano de treino sincronizado!",
                type: "success",
            })
            router.push("/dashboard/workouts")
        } catch (e: any) {
            notify({
                title: "Erro",
                message: e.message || "Nao foi possivel salvar o treino.",
                type: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    id="workout-form-back"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all text-xs font-bold uppercase"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                </button>
                <div className="text-xl font-black italic tracking-tighter uppercase text-primary" id="workout-form-title">
                    {editId ? "Editando Plano" : "Criacao de Elite"}
                </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="workout-form">
                <div className="glass-card p-8 rounded-3xl border border-white/5 shadow-2xl space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {user?.role === "personal" && (
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">
                                    Vincular ID Aluno
                                </label>
                                <input
                                    {...form.register("student_id")}
                                    id="workout-student-id-input"
                                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary/50"
                                    placeholder="Ex: 2"
                                />
                            </div>
                        )}
                        <div className={`space-y-3 ${user?.role !== "personal" ? "md:col-span-2" : ""}`}>
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">
                                Titulo do Treino
                            </label>
                            <input
                                {...form.register("title")}
                                id="workout-title-input"
                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary/50 text-xl font-bold"
                                placeholder="Treino de Hipertrofia Elite"
                            />
                            {form.formState.errors.title && (
                                <span className="text-red-400 text-[10px]">
                                    {form.formState.errors.title.message as string}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">
                            Observacoes do Treinador
                        </label>
                        <textarea
                            {...form.register("description")}
                            id="workout-description-input"
                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary/50 min-h-[100px]"
                            placeholder="Orientacoes de cadencia e descanso..."
                        />
                    </div>
                </div>

                {/* Cardio Section */}
                <div className="glass-card p-8 rounded-3xl border border-white/5 shadow-2xl space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${form.watch("cardio_enabled") ? "bg-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "bg-white/5 text-gray-500"}`}>
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black italic uppercase tracking-tight">Configuracao de Cardio</h3>
                                <p className="text-xs text-gray-500 font-medium">Meta de queima calorica ou tempo de execucao</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                {...form.register("cardio_enabled")}
                                className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-gray-400 peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500 shadow-inner"></div>
                        </label>
                    </div>

                    {form.watch("cardio_enabled") && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-6 pt-4 border-t border-white/5"
                        >
                            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 max-w-sm">
                                <button
                                    type="button"
                                    onClick={() => form.setValue("cardio_type", "minutes")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${form.watch("cardio_type") === "minutes" ? "bg-white/10 text-white shadow-xl" : "text-gray-500 hover:text-gray-300"}`}
                                >
                                    <Clock className="w-4 h-4" /> Minutos
                                </button>
                                <button
                                    type="button"
                                    onClick={() => form.setValue("cardio_type", "calories")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${form.watch("cardio_type") === "calories" ? "bg-white/10 text-white shadow-xl" : "text-gray-500 hover:text-gray-300"}`}
                                >
                                    <Flame className="w-4 h-4" /> Calorias
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {form.watch("cardio_type") === "minutes" ? (
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">
                                            Tempo Estimado (Minutos)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                {...form.register("cardio_duration_minutes")}
                                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-red-500/50"
                                                placeholder="Ex: 30"
                                            />
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">
                                            Meta de Queima (Kcal)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                {...form.register("cardio_calories")}
                                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-red-500/50"
                                                placeholder="Ex: 350"
                                            />
                                            <Flame className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-2 uppercase">
                            <Layers className="w-6 h-6 text-primary" />
                            GRADE DE EXERCICIOS
                        </h3>
                        <button
                            id="workout-add-exercise-button"
                            type="button"
                            onClick={() =>
                                append({
                                    name: "",
                                    sets_config: [{ type: "work", count: 3, reps: "10-12" }],
                                })
                            }
                            className="px-6 py-2.5 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                        >
                            + Add Exercicio
                        </button>
                    </div>

                    <div className="space-y-6" id="workout-exercises-list">
                        {fields.map((field, index) => (
                            <ExerciseCard
                                key={field.id}
                                index={index}
                                register={form.register}
                                control={form.control}
                                remove={remove}
                                notify={notify}
                                duplicate={() => duplicateExercise(index)}
                            />
                        ))}
                    </div>
                </div>

                <button
                    id="workout-submit-button"
                    type="submit"
                    disabled={loading}
                    className="group w-full py-6 rounded-[40px] bg-primary text-white font-black text-2xl shadow-[0_20px_50px_rgba(139,92,246,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <Save className="w-6 h-6" />
                            {editId ? "ATUALIZAR PLANO" : "SINCRONIZAR PLANO"}
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    )
}
