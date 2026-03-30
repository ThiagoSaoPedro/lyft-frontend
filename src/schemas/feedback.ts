import { z } from "zod";

export const createFeedbackSchema = z.object({
  type: z.enum(["bug", "feature", "general"], {
    errorMap: () => ({ message: "Tipo de feedback inválido" }),
  }),
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres").max(100),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;

export const feedbackSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.enum(["bug", "feature", "general"]),
  title: z.string(),
  description: z.string(),
  email_sent: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Feedback = z.infer<typeof feedbackSchema>;
