import { z } from "zod";

export const aiAnalysisLogSchema = z.object({
  id: z.string().uuid(),
  exercise_id: z.string().uuid(),
  accuracy_score: z.number().min(0).max(100),
  biomechanical_errors: z.array(z.string()),
  repetitions_completed: z.number().min(0),
});

export type AiAnalysisLog = z.infer<typeof aiAnalysisLogSchema>;

export const createSessionSchema = z.object({
  workout_id: z.string().uuid("ID do treino inválido"),
  session_date: z.string().date("Data inválida (YYYY-MM-DD)"),
  start_time: z.string().time("Horário inicial inválido").optional(),
  end_time: z.string().time("Horário final inválido").optional(),
  cardio_done: z.boolean().default(false),
  logs: z
    .array(
      z.object({
        exercise_id: z.string().uuid(),
        accuracy_score: z.number().min(0).max(100),
        biomechanical_errors: z.array(z.string()),
        repetitions_completed: z.number().min(0),
      })
    )
    .optional(),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;

export const trainingSessionSchema = z.object({
  id: z.string().uuid(),
  student_id: z.string().uuid(),
  workout_id: z.string().uuid(),
  session_date: z.string(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  cardio_done: z.boolean(),
  logs: z.array(aiAnalysisLogSchema),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type TrainingSession = z.infer<typeof trainingSessionSchema>;
