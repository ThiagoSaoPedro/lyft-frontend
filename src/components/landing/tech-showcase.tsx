"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { Activity, Cpu, Eye, Gauge, Zap } from "lucide-react"

//* CONSTANTS * //
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* 33-point skeleton: SVG joint positions (simplified human pose) */
const joints = [
  // Head
  { x: 200, y: 45 },
  { x: 200, y: 65 },
  // Torso
  { x: 200, y: 100 },
  { x: 200, y: 140 },
  { x: 200, y: 180 },
  // Left arm
  { x: 165, y: 100 },
  { x: 140, y: 130 },
  { x: 120, y: 160 },
  { x: 115, y: 170 },
  // Right arm
  { x: 235, y: 100 },
  { x: 260, y: 130 },
  { x: 280, y: 160 },
  { x: 285, y: 170 },
  // Left leg
  { x: 185, y: 180 },
  { x: 175, y: 220 },
  { x: 168, y: 260 },
  { x: 165, y: 280 },
  { x: 160, y: 290 },
  // Right leg
  { x: 215, y: 180 },
  { x: 225, y: 220 },
  { x: 232, y: 260 },
  { x: 235, y: 280 },
  { x: 240, y: 290 },
  // Extra joints (fingers, shoulders detail, hips detail)
  { x: 110, y: 175 },
  { x: 290, y: 175 },
  { x: 170, y: 98 },
  { x: 230, y: 98 },
  { x: 188, y: 182 },
  { x: 212, y: 182 },
  // Face detail points
  { x: 192, y: 50 },
  { x: 208, y: 50 },
  { x: 195, y: 58 },
  { x: 205, y: 58 },
  { x: 200, y: 55 },
]

const bones = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [2, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [4, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [16, 17],
  [4, 18],
  [18, 19],
  [19, 20],
  [20, 21],
  [21, 22],
  [7, 23],
  [11, 24],
  [2, 25],
  [2, 26],
  [4, 27],
  [4, 28],
]

const metrics = [
  { icon: Eye, label: "DETECCAO", value: "33 PONTOS", sub: "Articulares" },
  { icon: Gauge, label: "LATENCIA", value: "< 16ms", sub: "Por Frame" },
  { icon: Cpu, label: "MOTOR", value: "NEURAL V2", sub: "Proprietario" },
  { icon: Zap, label: "TAXA", value: "60 FPS", sub: "Tempo Real" },
]

export function TechShowcase() {
  return (
    <section id="tech" className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2"
          id="tech-showcase-grid"
        >
          {/* Left: Skeleton Visualization */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
            id="skeleton-visualization-container"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Background ring */}
              <div className="absolute inset-8 rounded-full border border-border/50" />
              <div className="absolute inset-16 rounded-full border border-primary/10" />

              {/* SVG Skeleton */}
              <svg viewBox="0 0 400 340" className="relative z-10 w-full h-full" fill="none" id="skeleton-svg">
                {/* Bones */}
                {bones.map(([a, b], i) => (
                  <motion.line
                    key={`bone-${i}`}
                    x1={joints[a].x}
                    y1={joints[a].y}
                    x2={joints[b].x}
                    y2={joints[b].y}
                    stroke="rgb(139,92,246)"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.03 }}
                  />
                ))}

                {/* Joints */}
                {joints.map((joint, i) => (
                  <motion.g key={`joint-${i}`}>
                    {/* Glow */}
                    <motion.circle
                      cx={joint.x}
                      cy={joint.y}
                      r="6"
                      fill="rgb(139,92,246)"
                      fillOpacity="0.15"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.02 }}
                    />
                    {/* Dot */}
                    <motion.circle
                      cx={joint.x}
                      cy={joint.y}
                      r="2.5"
                      fill="rgb(139,92,246)"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.02 }}
                    />
                  </motion.g>
                ))}

                {/* Central scanning line */}
                <motion.line
                  x1="0"
                  y1="0"
                  x2="400"
                  y2="0"
                  stroke="rgb(139,92,246)"
                  strokeWidth="1"
                  strokeOpacity="0.2"
                  initial={{ y1: 0, y2: 0 }}
                  whileInView={{
                    y1: [0, 340, 0],
                    y2: [0, 340, 0],
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </svg>

              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="absolute top-1/4 right-0 flex items-center gap-2 rounded border border-border bg-card/80 px-3 py-1.5 backdrop-blur-sm"
                id="skeleton-status-label"
              >
                <Activity className="h-3 w-3 text-primary" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                  Rastreio ativo
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Info & Metrics */}
          <motion.div variants={itemVariants} className="flex flex-col" id="tech-info-column">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary" id="tech-label">
              Protocolo de Rastreio
            </p>
            <h2 className="mt-4 text-3xl font-black italic uppercase tracking-tight text-foreground sm:text-5xl text-balance" id="tech-title">
              33 Pontos de Rastreio Articular
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground" id="tech-description">
              Nosso motor de visao computacional mapeia o corpo humano com 33 pontos articulares em tempo real. Cada ponto e rastreado a 60fps, proporcionando analise biomecanica de nivel clinico diretamente na camera do seu dispositivo.
            </p>

            {/* Metrics Grid */}
            <div className="mt-10 grid grid-cols-2 gap-4" id="tech-metrics-grid">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  id={`metric-card-${metric.label.toLowerCase()}`}
                  className="group flex flex-col gap-3 rounded-lg border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <metric.icon className="h-3.5 w-3.5 text-primary/70" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {metric.label}
                    </span>
                  </div>
                  <div>
                    <div className="text-xl font-black italic text-foreground">
                      {metric.value}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {metric.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
