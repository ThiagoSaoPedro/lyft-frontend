"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { User, Shield, Trophy, Zap, Flame, Camera, Pencil, ChevronRight, Lock, Target, Sunrise, Columns, Star, Dumbbell, Upload } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import { api } from "@/lib/api"

export default function ProfilePage() {
    //* HOOKS * //
    const { user } = useAuth()
    const [profile, setProfile] = useState<any>(user)
    const [bio, setBio] = useState("Focado na evolução constante. Mindset de atleta e disciplina inabalável. 🔥✈️")
    const [isEditingBio, setIsEditingBio] = useState(false)
    const [saving, setSaving] = useState(false)
    const [uploadingAvatar, setUploadingAvatar] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (user) {
            setProfile(user)
            if (user.bio) setBio(user.bio)
        }

        const fetchProfile = async () => {
            try {
                const response = await api.get('/me') as any
                // Safe extraction avoiding TypeScript structural errors
                let userData = null
                if (response && response.user) {
                    userData = response.user
                } else if (response && response.data && response.data.user) {
                    userData = response.data.user
                }

                if (userData) {
                    setProfile(userData)
                    if (userData.bio) {
                        setBio(userData.bio)
                    }
                }
            } catch (error) {
                console.error("Failed to fetch profile", error)
            }
        }

        fetchProfile()
    }, [user])

    const saveBio = async () => {
        setIsEditingBio(false)
        if (bio === profile?.bio) return
        setSaving(true)
        try {
            await api.put('/profile', { bio })
            setProfile((prev: any) => ({ ...prev, bio }))
        } catch (error) {
            console.error("Failed to update bio", error)
            setBio(profile?.bio || "")
        } finally {
            setSaving(false)
        }
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadingAvatar(true)
        const formData = new FormData()
        formData.append("avatar", file)

        try {
            const response = await api.post('/profile/avatar', formData) as any
            let avatarUrl = null
            if (response && response.avatar_url) {
                avatarUrl = response.avatar_url
            } else if (response && response.data && response.data.avatar_url) {
                avatarUrl = response.data.avatar_url
            }

            if (avatarUrl) {
                setProfile((prev: any) => ({ ...prev, avatar: avatarUrl }))
            }
        } catch (error) {
            console.error("Failed to upload avatar", error)
            alert("Erro ao enviar imagem. Verifique se tem menos de 5MB e  um formato vlido.");
        } finally {
            setUploadingAvatar(false)
            if (fileInputRef.current) fileInputRef.current.value = ""
        }
    }

    //* CONSTANTS * //
    const strikeCount = profile?.strikeCount || profile?.strike_count || 0
    const safeDaysLeft = profile?.safeDaysLeft || profile?.safe_days_left || 0
    const totalWorkouts = profile?.totalWorkouts || profile?.total_workouts || 0
    const xp = profile?.xp || 0
    const level = profile?.level || 1
    const rank = profile?.rank || "Iniciante"

    const getFlameColor = (count: number) => {
        if (count < 7) return "text-blue-400"
        if (count < 30) return "text-orange-500"
        return "text-purple-500"
    }

    const fireTextColor = getFlameColor(strikeCount)
    const fireBgColor = fireTextColor.replace("text-", "bg-") + "/10"

    const badges = [
        { id: 1, name: "7 Dias Seguidos", icon: Flame, unlocked: strikeCount >= 7, color: "text-orange-500", bg: "bg-orange-500/10" },
        { id: 2, name: "Treinador", icon: Target, unlocked: totalWorkouts >= 10, color: "text-purple-500", bg: "bg-purple-500/10" },
        { id: 3, name: "Madrugador", icon: Sunrise, unlocked: xp >= 100, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        { id: 4, name: "Mestre Kanban", icon: Columns, unlocked: level >= 2, color: "text-green-500", bg: "bg-green-500/10" },
        { id: 5, name: "30 Dias Strike", icon: Trophy, unlocked: strikeCount >= 30, color: "text-purple-600", bg: "bg-purple-600/10" },
        { id: 6, name: "Social Star", icon: Star, unlocked: xp >= 500, color: "text-pink-500", bg: "bg-pink-500/10" },
    ]

    const stats = [
        { label: "TREINOS", value: totalWorkouts, icon: Zap },
        { label: "PONTOS XP", value: xp, icon: Trophy },
        { label: "RANKING", value: rank, icon: Target },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pb-12 px-2"
            id="profile-page-root"
        >
            {/* Header Identity Section */}
            <section className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden" id="profile-identity-hero">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    disabled={uploadingAvatar}
                />

                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 w-full">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative" id="profile-avatar-container">
                            <div
                                className={`w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-5xl font-black text-white shadow-[0_0_30px_rgba(139,92,246,0.2)] overflow-hidden border border-white/10 group relative ${uploadingAvatar ? 'opacity-50' : 'cursor-pointer'}`}
                                onClick={() => !uploadingAvatar && fileInputRef.current?.click()}
                            >
                                {profile?.avatar ? (
                                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{profile?.name?.[0]?.toUpperCase() || "U"}{profile?.name?.split(" ")?.[1]?.[0]?.toUpperCase() || ""}</span>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    {uploadingAvatar ? (
                                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Camera className="w-8 h-8 text-white" />
                                    )}
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 p-1.5 bg-[#09090b] rounded-full border-2 border-white/5 shadow-lg">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingAvatar}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold text-white transition-all uppercase tracking-widest disabled:opacity-50"
                        >
                            <Upload className="w-3 h-3" />
                            {uploadingAvatar ? 'Enviando...' : 'Alterar Foto'}
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4 w-full">
                        <div>
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                                {profile?.name || "Atleta"}
                            </h2>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                                {profile?.email || "atleta@lyft.com"}
                            </p>
                        </div>

                        <div className="inline-flex items-center px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 mt-2 mb-2">
                            Nível {level} • {rank}
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-3 w-full">
                            {isEditingBio ? (
                                <div className="flex w-full max-w-2xl items-center gap-2">
                                    <input
                                        type="text"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && saveBio()}
                                        autoFocus
                                        disabled={saving}
                                        placeholder="Digite sua bio..."
                                        className="bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                    />
                                    <button
                                        onClick={saveBio}
                                        disabled={saving}
                                        className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap disabled:opacity-50"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center md:items-start gap-2">
                                    <p className="text-gray-400 text-sm italic max-w-2xl font-medium leading-relaxed">
                                        "{profile?.bio || bio}"
                                    </p>
                                    <button
                                        onClick={() => setIsEditingBio(true)}
                                        className="flex items-center gap-2 px-3 py-1.5 mt-1 text-gray-500 hover:text-white hover:bg-white/5 rounded-md transition-all text-xs font-bold uppercase tracking-widest"
                                    >
                                        <Pencil className="w-3 h-3" />
                                        Alterar Bio
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            </section>

            {/* Stats Grid - 4 Columns Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Strike Card */}
                <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 relative group hover:bg-white/[0.04] transition-all">
                    <Flame className={`w-6 h-6 mb-4 ${fireTextColor}`} />
                    <span className="absolute top-6 right-6 text-[8px] font-black uppercase text-gray-500 tracking-widest">STRIKE STREAK</span>
                    <div className="text-center py-2">
                        <h4 className="text-4xl font-black italic text-white uppercase tracking-tighter">
                            {strikeCount} <span className="text-xl">DIAS</span>
                        </h4>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-gray-500 justify-center text-center">
                        <Shield className="w-3 h-3 text-green-500" />
                        ✓ {safeDaysLeft} Safe Days
                    </div>
                </div>

                {/* Readiness Card */}
                <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 relative group hover:bg-white/[0.04] transition-all">
                    <Target className="w-6 h-6 text-green-500 mb-4" />
                    <button className="absolute top-6 right-6 px-3 py-1 rounded-lg bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest hover:bg-green-500/20 transition-all">
                        ATIVAR HOJE
                    </button>
                    <div className="text-left mt-4">
                        <h4 className="text-3xl font-black italic text-green-500 uppercase tracking-tighter">Pronto</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">para treinar</p>
                    </div>
                </div>

                {/* Workout Card */}
                <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 relative group hover:bg-white/[0.04] transition-all">
                    <Dumbbell className="w-6 h-6 text-blue-500 mb-4" />
                    <span className="absolute top-6 right-6 text-[8px] font-black uppercase text-gray-500 tracking-widest">TREINOS</span>
                    <div className="text-center py-2">
                        <h4 className="text-4xl font-black italic text-white uppercase tracking-tighter">{totalWorkouts}</h4>
                    </div>
                    <p className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Total realizados</p>
                </div>

                {/* XP Card */}
                <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 relative group hover:bg-white/[0.04] transition-all">
                    <Zap className="w-6 h-6 text-primary mb-4" />
                    <span className="absolute top-6 right-6 text-[8px] font-black uppercase text-gray-500 tracking-widest">PONTOS XP</span>
                    <div className="text-center py-2">
                        <h4 className="text-4xl font-black italic text-white uppercase tracking-tighter">{xp}</h4>
                    </div>
                    <p className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Experiência</p>
                </div>
            </div>

            {/* Medal Section - Horizontal Row */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h5 className="text-2xl font-black italic uppercase tracking-tighter text-white">Medalhas Ativas</h5>
                    <button className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1 hover:text-white transition-colors">
                        Ver Todas <ChevronRight className="w-3 h-3" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {badges.slice(0, 4).map((badge) => (
                        <div key={badge.id} className={`p-8 rounded-[32px] border border-white/5 flex flex-col items-center text-center transition-all ${badge.unlocked ? badge.bg + " border-transparent" : "bg-black/40 grayscale opacity-40"} group cursor-default shadow-lg`}>
                            <div className={`w-12 h-12 mb-6 ${badge.unlocked ? badge.color : "text-gray-500"} drop-shadow-xl`}>
                                <badge.icon className="w-full h-full" strokeWidth={1.5} />
                            </div>
                            <p className="text-sm font-black uppercase tracking-tight text-white mb-1">{badge.name}</p>
                            <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">{badge.unlocked ? "ATIVA" : "INATIVA"}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Analytics Bar */}
            <button className="w-full p-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg border border-primary/20">
                        <Target className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <p className="text-xl font-black italic uppercase tracking-tighter text-white">Analytics Performance</p>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Evolução de carga e volume</p>
                    </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-primary transition-all" />
            </button>

            {/* Layout Footer */}
            <footer className="pt-16 pb-4 flex flex-col md:flex-row items-center justify-between gap-6 px-4" id="profile-footer">
                <div className="flex items-center gap-8">
                    <button className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-colors">TERMOS</button>
                    <button className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-colors">PRIVACIDADE</button>
                    <button className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-colors">SUPORTE</button>
                </div>
                <p className="text-[8px] font-black text-gray-800 uppercase tracking-[0.4em] italic">LYFT • V2.1.0 • BUILT FOR PERFORMANCE</p>
            </footer>
        </motion.div>
    )
}
