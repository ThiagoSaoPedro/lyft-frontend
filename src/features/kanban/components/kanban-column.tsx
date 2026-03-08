"use client"

//* Libraries imports
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Dumbbell, CalendarDays, Plus } from "lucide-react"

//* Components imports
import { KanbanItem } from "./kanban-item"

//* Types imports
import type { Column, Workout } from "../types"

interface KanbanColumnProps {
    column: Column
    workouts: Workout[]
}

export function KanbanColumn({ column, workouts }: KanbanColumnProps) {
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
            className={`flex-shrink-0 w-80 flex flex-col h-full bg-black/10 rounded-[32px] p-6 border border-white/5 ${column.id === "Backlog" ? "border-dashed border-primary/20 bg-primary/[0.02]" : ""
                }`}
        >
            <div className="flex items-center justify-between mb-8" id={`kanban-column-header-${column.id}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        {column.id === "Backlog" ? (
                            <Dumbbell className="w-4 h-4 text-primary" />
                        ) : (
                            <CalendarDays className="w-4 h-4 text-primary" />
                        )}
                    </div>
                    <h3 className="font-black italic uppercase tracking-tighter text-lg">
                        {column.id === "Backlog" ? "Tudo" : column.title}
                    </h3>
                </div>
                <span className="text-[10px] font-black bg-white/5 px-2.5 py-1 rounded-full text-gray-500">
                    {workouts.length}
                </span>
            </div>

            <div
                className="flex-1 overflow-y-auto px-1 -mx-1 scrollbar-hide"
                id={`kanban-column-content-${column.id}`}
            >
                <SortableContext items={column.workoutIds} strategy={verticalListSortingStrategy}>
                    {workouts.map((workout) => (
                        <KanbanItem key={workout.id} id={workout.id} workout={workout} />
                    ))}
                </SortableContext>

                {workouts.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/5 rounded-2xl opacity-20">
                        <Plus className="w-6 h-6 mb-2" />
                        <span className="text-[10px] uppercase font-black tracking-widest">Arrastar Aqui</span>
                    </div>
                )}
            </div>
        </div>
    )
}
