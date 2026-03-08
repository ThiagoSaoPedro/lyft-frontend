"use client"

//* Libraries imports
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Activity, Lock, Mail, Loader2 } from "lucide-react"
import Link from "next/link"

//* Schemas imports
import { type LoginFields, loginSchema } from "@/schemas/auth"

//* Lib imports
import { api } from "@/lib/api"

export function LoginForm() {
    //* HOOKS * //
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const form = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
    })

    //* ACTIONS * //
    const onSubmit = async (data: LoginFields) => {
        setLoading(true)
        setErrorMsg("")
        try {
            const result: any = await api.post("/login", data)
            localStorage.setItem("token", result.token)
            localStorage.setItem("user", JSON.stringify(result.user))
            router.push("/dashboard")
        } catch (e: any) {
            setErrorMsg(e.message || "Erro de conexao com servidor.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="glass-card mb-8 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex flex-col items-center mb-10">
                <div className="p-3 mb-4 rounded-xl bg-primary/10 border border-primary/20" id="login-logo-container">
                    <Activity className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white" id="login-title">
                    Lyft
                </h1>
                <p className="text-muted-foreground mt-2" id="login-subtitle">
                    Personalizacao levada a serio.
                </p>
            </div>

            {errorMsg && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-2" id="login-error-message">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {errorMsg}
                    </div>
                </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="login-form">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1" htmlFor="login-email-input">
                        E-mail
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                        <input
                            {...form.register("email")}
                            id="login-email-input"
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        />
                    </div>
                    {form.formState.errors.email && (
                        <p className="text-red-400 text-xs mt-1 ml-1" id="login-email-error">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1" htmlFor="login-password-input">
                        Senha
                    </label>
                    <div className="relative group">
                        <div id="login-password-wrapper">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <input
                                {...form.register("password")}
                                id="login-password-input"
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>
                    </div>
                    {form.formState.errors.password && (
                        <p className="text-red-400 text-xs mt-1 ml-1" id="login-password-error">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    id="login-submit-button"
                    type="submit"
                    disabled={loading}
                    className="relative w-full overflow-hidden group py-3 rounded-xl bg-primary text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-70"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Entrando...
                        </div>
                    ) : (
                        "Entrar na Plataforma"
                    )}
                </button>
            </form>

            <div className="mt-10 text-center">
                <p className="text-sm text-muted-foreground">
                    Nao tem uma conta?{" "}
                    <Link
                        href="/signup"
                        className="text-primary hover:underline cursor-pointer font-bold"
                        id="login-signup-link"
                    >
                        Crie seu perfil gratis
                    </Link>
                </p>
            </div>
        </div>
    )
}
