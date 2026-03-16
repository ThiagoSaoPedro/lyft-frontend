"use client"

//* Libraries imports
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Dumbbell, CalendarDays, Plus, CalendarCheck, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

//* Components imports
import { KanbanItem } from "./kanban-item"

//* Types imports
import type { Column, Workout } from "../types"

interface KanbanColumnProps {
    column: Column
    workouts: Workout[]
    isToday?: boolean
}

export function KanbanColumn({ column, workouts, isToday }: KanbanColumnProps) {
    //* HOOKS * //
    const { setNodeRef } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    })

    return (
        <div
            ref={setNodeRef}
            id={`kanban-column-${column.id}`}
            role="region"
            aria-label={`Coluna ${column.title}${isToday ? ", hoje" : ""}, ${workouts.length} treinos`}
            className={`flex-shrink-0 w-80 flex flex-col h-full rounded-[32px] p-6 border transition-all ${isToday
                ? "bg-primary/[0.04] border-primary/20 shadow-[0_0_40px_rgba(139,92,246,0.08)]"
                : column.id === "Próximos Treinos"
                    ? "bg-primary/[0.02] border-dashed border-primary/20 bg-black/10"
                    : "bg-black/10 border-white/5"
                }`}
        >
            <div className="flex items-center justify-between mb-8" id={`kanban-column-header-${column.id}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        {isToday ? (
                            <CalendarCheck className="w-4 h-4 text-primary" />
                        ) : column.id === "Próximos Treinos" ? (
                            <Dumbbell className="w-4 h-4 text-primary" />
                        ) : (
                            <CalendarDays className="w-4 h-4 text-gray-500" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-black italic uppercase tracking-tighter text-lg">
                            {column.id === "Próximos Treinos" ? "Próximos Treinos" : column.title}
                        </h3>
                        {column.id === "Próximos Treinos" && (
                            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest block mt-0.5">
                                Sem dia definido
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isToday && (
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 animate-pulse">
                            Hoje
                        </span>
                    )}
                    <span className="text-[10px] font-black bg-white/5 px-2.5 py-1 rounded-full text-gray-500">
                        {workouts.length}
                    </span>
                </div>
            </div>

            <div
                className="flex-1 overflow-y-auto px-1 -mx-1 scrollbar-hide"
                id={`kanban-column-content-${column.id}`}
            >
                <SortableContext items={column.workoutIds} strategy={verticalListSortingStrategy}>
                    {workouts.map((workout) => (
                        <KanbanItem key={workout.id} id={String(workout.id)} workout={workout} />
                    ))}
                </SortableContext>

                {workouts.length === 0 && (
                    isToday ? (
                        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-primary/20 rounded-2xl bg-primary/[0.03]">
                            <CalendarCheck className="w-5 h-5 mb-2 text-primary/40" />
                            <span className="text-[10px] uppercase font-black tracking-widest text-primary/40">Dia Livre</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/5 rounded-2xl opacity-20">
                            <Plus className="w-6 h-6 mb-2" />
                            <span className="text-[10px] uppercase font-black tracking-widest">Arrastar Aqui</span>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
