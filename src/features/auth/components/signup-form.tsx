"use client"

//* Libraries imports
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Lock, Mail, User, Loader2, Dumbbell, Users, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

//* Schemas imports
import { type SignupFields, signupSchema } from "@/schemas/auth"

//* Lib imports
import { api } from "@/lib/api"

export function SignupForm() {
    //* HOOKS * //
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [selectedRole, setSelectedRole] = useState<"personal" | "user" | "student">("user")

    const form = useForm<SignupFields>({
        resolver: zodResolver(signupSchema),
        defaultValues: { role: "user" },
    })

    //* CONSTANTS * //
    const roles = [
        {
            id: "personal",
            label: "Personal Trainer",
            desc: "Para profissionais que gerenciam alunos",
            icon: Dumbbell,
        },
        {
            id: "user",
            label: "Atleta Solo",
            desc: "Treine por conta propria com analise de IA",
            icon: Activity,
        },
        {
            id: "student",
            label: "Aluno de Personal",
            desc: "Vincule-se ao seu treinador atual",
            icon: Users,
        },
    ]

    //* ACTIONS * //
    const onSubmit = async (data: SignupFields) => {
        setLoading(true)
        setErrorMsg("")
        try {
            const result: any = await api.post("/register", data)
            localStorage.setItem("token", result.token)
            localStorage.setItem("user", JSON.stringify(result.user))
            router.push("/dashboard")
        } catch (e: any) {
            setErrorMsg(e.message || "Erro ao criar conta")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex flex-col items-center mb-10 text-center">
                <div className="p-3 mb-4 rounded-xl bg-primary/10 border border-primary/20" id="signup-logo-container">
                    <Activity className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white" id="signup-title">
                    Criar sua Conta <span className="gradient-text italic">Pro</span>
                </h1>
                <p className="text-muted-foreground mt-2" id="signup-subtitle">
                    Escolha seu tipo de perfil para comecar.
                </p>
            </div>

            {errorMsg && (
                <div
                    className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-in fade-in slide-in-from-top-2"
                    id="signup-error-message"
                >
                    {errorMsg}
                </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="signup-form">
                {/* Role Selection Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="signup-role-selector">
                    {roles.map((r) => (
                        <button
                            key={r.id}
                            id={`signup-role-${r.id}`}
                            type="button"
                            onClick={() => {
                                setSelectedRole(r.id as any)
                                form.setValue("role", r.id as any)
                            }}
                            className={`relative p-5 rounded-2xl border transition-all text-left flex flex-col gap-3 group ${selectedRole === r.id
                                ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                                : "bg-white/5 border-white/5 hover:border-white/10"
                                }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedRole === r.id ? "bg-primary text-white" : "bg-white/5 text-gray-400 group-hover:text-white"
                                    }`}
                            >
                                <r.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white mb-1">{r.label}</div>
                                <div className="text-[10px] text-gray-500 leading-tight">{r.desc}</div>
                            </div>
                            {selectedRole === r.id && (
                                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center scale-75">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1" htmlFor="signup-name-input">
                            Seu Nome
                        </label>
                        <div className="relative group">
                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <input
                                {...form.register("name")}
                                id="signup-name-input"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                placeholder="Nome completo"
                            />
                        </div>
                        {form.formState.errors.name && (
                            <p className="text-red-400 text-xs mt-1 ml-1" id="signup-name-error">
                                {form.formState.errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1" htmlFor="signup-email-input">
                            E-mail
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <input
                                {...form.register("email")}
                                id="signup-email-input"
                                type="email"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                placeholder="atleta@dominio.com"
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-red-400 text-xs mt-1 ml-1" id="signup-email-error">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1" htmlFor="signup-password-input">
                            Senha
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <input
                                {...form.register("password")}
                                id="signup-password-input"
                                type="password"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        {form.formState.errors.password && (
                            <p className="text-red-400 text-xs mt-1 ml-1" id="signup-password-error">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    <AnimatePresence>
                        {selectedRole === "student" && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-2"
                            >
                                <label className="text-sm font-medium text-gray-400 ml-1" htmlFor="signup-personal-id-input">
                                    Codigo do Personal (Opcional)
                                </label>
                                <input
                                    {...form.register("personal_id")}
                                    id="signup-personal-id-input"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-primary/50 transition-all"
                                    placeholder="Ex: 1"
                                />
                                <p className="text-[10px] text-gray-600 ml-1">Deixe vazio se for vincular depois.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    id="signup-submit-button"
                    type="submit"
                    disabled={loading}
                    className="relative w-full overflow-hidden group py-4 rounded-xl bg-primary text-white font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] disabled:opacity-70 mt-4"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin mr-2" />
                            Criando seu perfil...
                        </div>
                    ) : (
                        "Criar Minha Conta Agora"
                    )}
                </button>
            </form>

            <div className="mt-10 text-center">
                <p className="text-sm text-muted-foreground">
                    Ja tem uma conta?{" "}
                    <Link
                        href="/login"
                        className="text-primary hover:underline cursor-pointer font-bold"
                        id="signup-login-link"
                    >
                        Entrar na plataforma
                    </Link>
                </p>
            </div>
        </div>
    )
}
