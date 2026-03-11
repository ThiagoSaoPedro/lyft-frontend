import { z } from "zod"

export const workoutSchema = z.object({
    student_id: z.string().optional(),
    title: z.string().min(3, "Titulo muito curto"),
    description: z.string().optional(),
    planned_day: z.string().optional(),
    cardio_enabled: z.boolean().default(false),
    cardio_type: z.enum(["minutes", "calories"]).default("minutes"),
    cardio_duration_minutes: z.coerce.number().optional().nullable(),
    cardio_calories: z.coerce.number().optional().nullable(),
    exercises: z
        .array(
            z.object({
                name: z.string().min(2, "Nome do exercicio obrigatorio"),
                sets_config: z
                    .array(
                        z.object({
                            type: z.enum(["warmup", "feeder", "work", "dropset"]),
                            count: z.coerce.number().min(1),
                            reps: z.string().min(1, "Especifique as repeticoes (ex: 10-12)"),
                        }),
                    )
                    .min(1, "Adicione ao menos uma serie"),
            }),
        )
        .min(1, "Adicione ao menos um exercicio"),
})

export type WorkoutFields = z.infer<typeof workoutSchema>
