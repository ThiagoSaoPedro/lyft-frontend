import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  bio: z.string().max(500, "Bio deve ter no máximo 500 caracteres").optional(),
  avatar: z.string().optional(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

export const profileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  level: z.string(),
  rank: z.string(),
  xp: z.number(),
  strikeCount: z.number(),
  safeDaysLeft: z.number(),
  totalWorkouts: z.number(),
});

export type Profile = z.infer<typeof profileSchema>;

export const badgeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  earned: z.boolean(),
});

export type Badge = z.infer<typeof badgeSchema>;
