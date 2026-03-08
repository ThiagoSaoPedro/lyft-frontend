import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Email invlido"),
    password: z.string().min(6, "A senha deve ter no mnimo 6 caracteres"),
})

export type LoginFields = z.infer<typeof loginSchema>

export const signupSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email invlido"),
    password: z.string().min(6, "A senha deve ter no mnimo 6 caracteres"),
    role: z.enum(["personal", "user", "student"]),
    personal_id: z.string().optional(),
})

export type SignupFields = z.infer<typeof signupSchema>
