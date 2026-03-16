"use client"

//* Libraries imports
import { useState, useEffect } from "react"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { Clock, Flame, Loader2, Moon, Archive, Dumbbell, Activity } from "lucide-react"
import { motion } from "framer-motion"

//* Components imports
import { KanbanColumn } from "./kanban-column"

//* Types imports
import { type Workout, type Column, DAYS } from "../types"

//* Hooks imports
import { useAuth } from "@/components/auth-provider"
import { useNotification } from "@/context/notification-context"

export function KanbanBoard() {
    //* HOOKS * //
    const { token } = useAuth()
    const { notify } = useNotification()
    const [workouts, setWorkouts] = useState<Record<string, Workout>>({})
    const [columns, setColumns] = useState<Column[]>([])
    const [loading, setLoading] = useState(true)
    const [activeId, setActiveId] = useState<string | null>(null)

    //* TODAY INDICATOR * //
    const DAY_MAP: Record<number, string> = {
        0: "Domingo",
        1: "Segunda",
        2: "Terça",
        3: "Quarta",
        4: "Quinta",
        5: "Sexta",
        6: "Sábado",
    }
    const todayColumnId = DAY_MAP[new Date().getDay()] ?? null

    //* WEEKLY STATS * //
    const scheduledCount = columns.filter(col => col.id !== "Próximos Treinos" && col.workoutIds.length > 0).length
    const restDays = 7 - scheduledCount
    const backlogCount = columns.find(col => col.id === "Próximos Treinos")?.workoutIds.length ?? 0
    const totalExercises = Object.values(workouts).reduce((sum, w) => sum + (w.exercises?.length || 0), 0)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    useEffect(() => {
        fetchWorkouts()
    }, [])

    //* ACTIONS * //
    const fetchWorkouts = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/workouts", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            const data = await res.json()
            const workoutList: any[] = data.data || []

            const workoutMap: Record<string, Workout> = {}
            workoutList.forEach((w) => {
                workoutMap[w.id.toString()] = {
                    ...w,
                    id: w.id.toString(),
                }
            })
            setWorkouts(workoutMap)

            const newColumns: Column[] = DAYS.map((day) => ({
                id: day,
                title: day,
                workoutIds: workoutList
                    .filter((w) => w.planned_day === day || (!w.planned_day && day === "Próximos Treinos"))
                    .map((w) => w.id.toString()),
            }))
            setColumns(newColumns)
        } catch (e) {
            notify({
                title: "Erro de Conexao",
                message: "Falha ao carregar treinos.",
                type: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    const updateWorkoutInBackend = async (id: string, plannedDay: string | null) => {
        try {
            const workout = workouts[id]
            const res = await fetch(`http://localhost:8000/api/workouts/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...workout,
                    id: parseInt(id),
                    planned_day: plannedDay === "Próximos Treinos" ? null : plannedDay,
                }),
            })
            if (!res.ok) throw new Error("Update failed")
        } catch (e) {
            notify({
                title: "Erro",
                message: "Falha ao sincronizar agenda no servidor.",
                type: "error",
            })
            fetchWorkouts()
        }
    }

    const findColumn = (id: string) => {
        if (id in workouts) {
            return columns.find((col) => col.workoutIds.includes(id))
        }
        return columns.find((col) => col.id === id)
    }

    const handleDragStart = (event: any) => {
        const { active } = event
        setActiveId(active.id)
    }

    const handleDragOver = (event: any) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        const activeColumn = findColumn(activeId)
        const overColumn = findColumn(overId)

        if (!activeColumn || !overColumn || activeColumn === overColumn) return

        setColumns((prev) => {
            const activeItems = activeColumn.workoutIds
            const overItems = overColumn.workoutIds

            const activeIndex = activeItems.indexOf(activeId)
            const overIndex = overId in workouts ? overItems.indexOf(overId) : overItems.length

            return prev.map((col) => {
                if (col.id === activeColumn.id) {
                    return { ...col, workoutIds: activeItems.filter((i) => i !== activeId) }
                }
                if (col.id === overColumn.id) {
                    const newItems = [...overItems]
                    newItems.splice(overIndex, 0, activeId)
                    return { ...col, workoutIds: newItems }
                }
                return col
            })
        })
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        setActiveId(null)
        if (!over) return

        const activeId = active.id
        const overId = over.id

        const activeColumn = findColumn(activeId)
        const overColumn = findColumn(overId)

        if (activeColumn && overColumn) {
            updateWorkoutInBackend(activeId, overColumn.id)

            if (activeColumn === overColumn) {
                const activeIndex = activeColumn.workoutIds.indexOf(activeId)
                const overIndex = overColumn.workoutIds.indexOf(overId)

                if (activeIndex !== overIndex) {
                    setColumns((prev) =>
                        prev.map((col) => {
                            if (col.id === activeColumn.id) {
                                return {
                                    ...col,
                                    workoutIds: arrayMove(col.workoutIds, activeIndex, overIndex),
                                }
                            }
                            return col
                        }),
                    )
                }
            }
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">
                    Carregando Bio-Agenda...
                </span>
            </div>
        )
    }

    return (
        <div className="min-h-[calc(100vh-6rem)] flex flex-col overflow-hidden">
            <div className="mb-10 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                    id="kanban-header-container"
                >
                    <div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 block">
                            Planner Semanal
                        </span>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter" id="kanban-header-title">
                            Agenda de <span className="text-primary italic">Alta Performance</span>
                        </h1>
                    </div>
                </motion.div>
            </div>

            <div className="px-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-0 bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden"
                    id="kanban-stats-bar"
                >
                    <div className="flex-1 px-6 py-4 flex items-center justify-center border-r border-white/5">
                        <div className="text-center">
                            <div className="text-xl font-black text-primary italic">{scheduledCount}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mt-1">Treinos</div>
                        </div>
                    </div>
                    <div className="flex-1 px-6 py-4 flex items-center justify-center border-r border-white/5">
                        <div className="text-center">
                            <div className="text-xl font-black text-gray-400 italic">{restDays}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mt-1">Descanso</div>
                        </div>
                    </div>
                    <div className="flex-1 px-6 py-4 flex items-center justify-center border-r border-white/5">
                        <div className="text-center">
                            <div className="text-xl font-black text-orange-400 italic">{backlogCount}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mt-1">Próximos Treinos</div>
                        </div>
                    </div>
                    <div className="flex-1 px-6 py-4 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-xl font-black text-green-400 italic">{totalExercises}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mt-1">Exercícios</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div
                className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-8 scrollbar-hide"
                id="kanban-board-scroll-area"
            >
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-6 h-full min-w-max" id="kanban-columns-container">
                        {columns.map((column) => (
                            <KanbanColumn
                                key={column.id}
                                column={column}
                                workouts={column.workoutIds.map((id) => workouts[id])}
                                isToday={column.id === todayColumnId}
                            />
                        ))}
                    </div>

                    <DragOverlay
                        dropAnimation={{
                            sideEffects: defaultDropAnimationSideEffects({
                                styles: {
                                    active: { opacity: "0.3" },
                                },
                            }),
                        }}
                    >
                        {activeId ? (() => {
                            const dragWorkout = workouts[activeId]
                            const dragIntensity = dragWorkout.exercises.length > 5 ? "High"
                                : dragWorkout.exercises.length > 3 ? "Medium" : "Low"
                            const dragIntensityColor = {
                                Low: "text-green-400 bg-green-500/10",
                                Medium: "text-orange-400 bg-orange-500/10",
                                High: "text-red-400 bg-red-500/10",
                            }[dragIntensity]

                            return (
                                <div
                                    id="kanban-drag-overlay"
                                    className="glass-card p-4 rounded-2xl w-80 border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.3)] scale-105"
                                >
                                    <h4 className="font-bold text-sm mb-3 uppercase tracking-tight">
                                        {dragWorkout.title}
                                    </h4>
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {dragWorkout.exercises.length * 10} min
                                        </div>
                                        <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${dragIntensityColor}`}>
                                            <Flame className="w-3 h-3" />
                                            {dragIntensity}
                                        </div>
                                    </div>
                                </div>
                            )
                        })() : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    )
}
