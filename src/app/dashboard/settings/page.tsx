"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { Settings, Shield, Bell, Smartphone, User, Lock } from "lucide-react"

export default function SettingsPage() {
    //* CONSTANTS * //
    const sections = [
        { title: "Perfil", icon: User, desc: "Gerencie suas informacoes pessoais e credenciais." },
        { title: "Privacidade", icon: Shield, desc: "Controle quem pode ver seus dados de performance." },
        { title: "Notificacoes", icon: Bell, desc: "Configure alertas de treinos e novidades." },
        { title: "Dispositivos", icon: Smartphone, desc: "Sincronize seu Apple Watch ou Garmin." },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8" id="settings-page-root">
            <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-2 uppercase">
                <Settings className="w-6 h-6 text-primary" />
                CONFIGURACOES DO SISTEMA
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="settings-sections-grid">
                {sections.map((section, i) => (
                    <div key={i} id={`settings-section-${section.title.toLowerCase()}`} className="glass-card p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-all cursor-not-allowed group opacity-60">
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-4 rounded-2xl bg-white/5 text-primary group-hover:scale-110 transition-transform">
                                <section.icon className="w-6 h-6" />
                            </div>
                            <Lock className="w-4 h-4 text-gray-700" />
                        </div>
                        <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">{section.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{section.desc}</p>
                        <div className="mt-6 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 py-2 px-4 rounded-full inline-block">
                            Em breve na v2.0
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card p-8 rounded-[40px] border border-white/10 bg-gradient-to-r from-primary/10 to-transparent" id="settings-promo-card">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Plano de Elite Ativo</h4>
                        <p className="text-gray-400 text-sm">Voce esta usando a versao Pro do Lyft. Aproveite todas as funcionalidades biomecanicas.</p>
                    </div>
                    <button id="upgrade-core-button" className="px-10 py-4 rounded-full bg-white text-black font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                        Upgrade Core
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
