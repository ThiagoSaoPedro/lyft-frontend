'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useNotification } from '@/context/notification-context'
import { MessageSquare, AlertCircle, Lightbulb, Palette, Sparkles } from 'lucide-react'

type FeedbackType = 'bug' | 'feature' | 'general' | 'ui_ux'

const feedbackTypes: { type: FeedbackType; label: string; icon: typeof AlertCircle; color: string }[] = [
    { type: 'bug', label: 'Bug', icon: AlertCircle, color: 'text-red-500' },
    { type: 'feature', label: 'Feature', icon: Sparkles, color: 'text-emerald-500' },
    { type: 'general', label: 'Geral', icon: Lightbulb, color: 'text-yellow-500' },
    { type: 'ui_ux', label: 'UI/UX', icon: Palette, color: 'text-purple-500' },
]

export default function FeedbackPage() {
    const { user, token } = useAuth()
    const { notify } = useNotification()

    const [feedbackType, setFeedbackType] = useState<FeedbackType>('general')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || !description.trim()) {
            notify({
                type: 'error',
                title: 'Erro',
                message: 'Preencha todos os campos!',
            })
            return
        }

        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Bypass-Tunnel-Reminder': 'true',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify({
                    type: feedbackType,
                    title,
                    description,
                }),
            })

            if (response.ok) {
                notify({
                    type: 'success',
                    title: 'Sucesso!',
                    message: 'Obrigado pelo seu feedback! Nos ajudou a melhorar.',
                })
                setTitle('')
                setDescription('')
                setFeedbackType('general')
            } else {
                notify({
                    type: 'error',
                    title: 'Erro',
                    message: 'Não foi possível enviar o feedback.',
                })
            }
        } catch (error) {
            console.error('Erro ao enviar feedback:', error)
            notify({
                type: 'error',
                title: 'Erro',
                message: 'Erro ao conectar com o servidor.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white uppercase tracking-tight">
                                Seu Feedback
                            </h1>
                            <p className="text-gray-400 mt-2">
                                Ajude-nos a melhorar! Reporte bugs, sugira features ou deixe comentários.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Tipo de Feedback */}
                        <div>
                            <label className="block text-sm font-bold text-gray-300 uppercase tracking-wide mb-4">
                                Tipo de Feedback
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {feedbackTypes.map(({ type, label, icon: Icon, color }) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFeedbackType(type)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${feedbackType === type
                                            ? 'bg-primary/20 border-primary text-white'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${color}`} />
                                        <span className="text-xs font-bold">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Título */}
                        <div>
                            <label className="block text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
                                Título
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ex: Interface de login confusa"
                                maxLength={255}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2">{title.length}/255</p>
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className="block text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
                                Descrição
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descreva em detalhes o problema, sugestão ou comentário..."
                                maxLength={2000}
                                rows={6}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 transition-all resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-2">{description.length}/2000</p>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-4 px-6 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.4)]"
                            >
                                {loading ? 'Enviando...' : 'Enviar Feedback'}
                            </button>
                        </div>

                        {/* Info Box */}
                        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                            <p className="text-sm text-gray-300">
                                <span className="font-bold text-primary">💡 Dica:</span> Seja específico e descreva o contexto. Isso nos ajuda a entender melhor e resolver mais rápido!
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
