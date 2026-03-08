"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { TrendingUp, type LucideIcon } from "lucide-react"

interface Stat {
    label: string
    value: string
    icon: LucideIcon
    color: string
}

interface StatsGridProps {
    stats: Stat[]
}

export function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="dashboard-stats-grid">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all group"
                    id={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <TrendingUp className="w-4 h-4 text-gray-700 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-1">
                        {stat.label}
                    </div>
                    <div className="text-3xl font-black">{stat.value}</div>
                </motion.div>
            ))}
        </div>
    )
}
