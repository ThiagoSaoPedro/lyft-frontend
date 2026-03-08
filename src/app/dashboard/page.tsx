"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { Target, Calendar, Zap, Flame } from "lucide-react"

//* Components imports
import { StatsGrid } from "@/features/dashboard/components/stats-grid"
import { PerformanceRadar } from "@/features/dashboard/components/performance-radar"
import { TrainingLogs } from "@/features/dashboard/components/training-logs"

export default function Dashboard() {
    //* CONSTANTS * //
    const stats = [
        { label: "Foco Semanal", value: "92%", icon: Target, color: "text-primary" },
        { label: "Volume Total", value: "125t", icon: Flame, color: "text-orange-500" },
        { label: "Consistncia", value: "18d", icon: Calendar, color: "text-blue-500" },
        { label: "Score Bio", value: "8.4", icon: Zap, color: "text-green-500" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
            id="dashboard-page-container"
        >
            <StatsGrid stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <PerformanceRadar />
                <TrainingLogs />
            </div>
        </motion.div>
    )
}
