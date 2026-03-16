export interface SetConfig {
    type: 'warmup' | 'feeder' | 'work' | 'dropset'
    count: number
    reps: string
}

export interface Exercise {
    name: string
    sets_config: SetConfig[]
}

export interface Workout {
    id: number
    personal_id?: number | null
    student_id?: number | null
    title: string
    description?: string
    planned_day?: string | null
    cardio_enabled?: boolean
    cardio_type?: 'minutes' | 'calories'
    cardio_duration_minutes?: number | null
    cardio_calories?: number | null
    exercises: Exercise[]
}

export interface Column {
    id: string
    title: string
    workoutIds: string[]
}

export const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo", "Próximos Treinos"]
