"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { Brain, Target, Trophy } from "lucide-react"

//* CONSTANTS * //
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const features = [
  {
    icon: Brain,
    title: "Neural Vision 2.0",
    description:
      "Rede neural proprietaria treinada em mais de 10 milhoes de movimentos. Detecta 33 pontos articulares em tempo real com precisao de nivel clinico.",
    tag: "CORE ENGINE",
  },
  {
    icon: Target,
    title: "Biomechanical Scoring",
    description:
      "Sistema de pontuacao biomecanica que analisa amplitude, simetria, velocidade e controle de cada repeticao. Feedback instantaneo para forma perfeita.",
    tag: "ANALYSIS",
  },
  {
    icon: Trophy,
    title: "Data-Driven Evolution",
    description:
      "Algoritmos adaptativos ajustam seu programa em tempo real. Progressao inteligente baseada no seu historico de desempenho e metas individuais.",
    tag: "OPTIMIZATION",
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-32 lg:py-40">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
        id="features-header-container"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary" id="features-label">
            Tecnologia Proprietaria
          </p>
          <h2 className="mt-4 text-3xl font-black italic uppercase tracking-tight text-foreground sm:text-5xl text-balance" id="features-title">
            Infraestrutura de Elite
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground" id="features-description">
            Tres pilares tecnologicos que transformam a camera do seu dispositivo no treinador mais avancado do mundo.
          </p>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-5 px-6 md:grid-cols-3 lg:px-8"
        id="features-grid"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            id={`feature-card-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-lg border border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/80"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              {/* Tag */}
              <span className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] text-primary/70">
                {feature.tag}
              </span>

              {/* Icon */}
              <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary/50 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mt-6 text-lg font-bold italic uppercase tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>

              {/* Decorative line */}
              <div className="mt-8 h-px w-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
