"use client"

//* Libraries imports
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, MoreHorizontal, Clock, Flame, Activity } from "lucide-react"

//* Types imports
import type { Workout } from "../types"

interface KanbanItemProps {
    id: string
    workout: Workout
}

export function KanbanItem({ id, workout }: KanbanItemProps) {
    //* HOOKS * //
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    //* CONSTANTS * //
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    }

    // Proxy for duration/intensity based on exercise count
    const intensity =
        workout.exercises.length > 5 ? "High" : workout.exercises.length > 3 ? "Medium" : "Low"
    const intensityColor = {
        Low: "text-green-400 bg-green-500/10",
        Medium: "text-orange-400 bg-orange-500/10",
        High: "text-red-400 bg-red-500/10",
    }[intensity]

    return (
        <div
            ref={setNodeRef}
            style={style}
            id={`kanban-item-${id}`}
            className="glass-card p-4 rounded-2xl mb-3 group cursor-pointer hover:border-primary/30 transition-all border border-white/5 bg-white/[0.02]"
        >
            <div className="flex items-start justify-between mb-2">
                <div
                    {...attributes}
                    {...listeners}
                    id={`kanban-item-drag-${id}`}
                    className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-gray-600 hover:text-gray-400"
                >
                    <GripVertical className="w-4 h-4" />
                </div>
                <button
                    id={`kanban-item-options-${id}`}
                    className="text-gray-600 hover:text-white transition-colors"
                >
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>

            <h4 className="font-bold text-sm mb-3 uppercase tracking-tight line-clamp-1">{workout.title}</h4>

            <div className="flex flex-wrap gap-1.5 mb-3">
                {workout.exercises.slice(0, 3).map((ex, i) => (
                    <span
                        key={i}
                        className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-gray-400"
                    >
                        {ex.name}
                    </span>
                ))}
                {workout.exercises.length > 3 && (
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                        +{workout.exercises.length - 3}
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {workout.exercises.length * 10} min
                </div>
                {workout.cardio_enabled ? (
                    <div className="px-2 py-0.5 rounded-full flex items-center gap-1 text-red-400 bg-red-400/10 border border-red-400/20">
                        <Activity className="w-3 h-3" />
                        {workout.cardio_type === 'calories' ? `${workout.cardio_calories} kcal` : `${workout.cardio_duration_minutes} min`}
                    </div>
                ) : (
                    <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${intensityColor}`}>
                        <Flame className="w-3 h-3" />
                        {intensity}
                    </div>
                )}
            </div>
        </div>
    )
}
