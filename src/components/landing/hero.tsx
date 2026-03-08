"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

//* CONSTANTS * //
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero-section"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
        id="hero-content-container"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center" id="hero-badge">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Neural Vision 2.0 Ativo
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-black italic uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl lg:text-[7.5rem]"
          id="hero-main-heading"
        >
          <span className="block text-balance">Treine com</span>
          <span className="block text-primary text-balance">Visao de</span>
          <span className="block text-balance">Maquina</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          id="hero-subtitle"
        >
          Unimos ciencia esportiva de elite com inteligencia artificial para criar o protocolo de
          treino mais avancado do planeta.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          id="hero-cta-container"
        >
          <a
            id="hero-primary-cta"
            href="#cta"
            className="group inline-flex items-center gap-2.5 rounded-sm bg-primary px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:bg-primary/90"
          >
            Iniciar Protocolo
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            id="hero-secondary-cta"
            href="#tech"
            className="group inline-flex items-center gap-2.5 rounded-sm border border-border bg-transparent px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:border-muted-foreground hover:bg-secondary/50"
          >
            <Play className="h-3.5 w-3.5 text-primary" />
            Ver Demonstracao
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-8 pt-10"
          id="hero-stats-row"
        >
          {[
            { value: "33", label: "Pontos de Rastreio" },
            { value: "60fps", label: "Analise em Tempo Real" },
            { value: "99.2%", label: "Precisao Neural" },
          ].map((stat) => (
            <div key={stat.label} className="text-center" id={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="text-2xl font-black italic text-foreground sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
