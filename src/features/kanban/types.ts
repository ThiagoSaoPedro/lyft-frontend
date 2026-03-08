export interface Workout {
    id: string
    title: string
    description?: string
    planned_day?: string | null
    exercises: any[]
}

export interface Column {
    id: string
    title: string
    workoutIds: string[]
}

export const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo", "Backlog"]
