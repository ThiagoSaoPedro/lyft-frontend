"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function EliteCta() {
  return (
    <section id="cta" className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grain-overlay relative overflow-hidden rounded-2xl"
        >
          {/* Purple gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9] via-[#8B5CF6] to-[#5B21B6]" />

          {/* Radial highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

          <div className="relative z-10 flex flex-col items-center px-8 py-20 text-center sm:px-16 lg:py-28">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffffff99]"
            >
              Acesso Limitado
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-6 text-4xl font-black italic uppercase leading-[0.95] tracking-tight text-[#ffffff] sm:text-6xl lg:text-7xl text-balance"
            >
              Eleve seu protocolo de treino
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#ffffffcc]"
            >
              Junte-se ao grupo seleto de atletas e profissionais que usam inteligencia artificial para maximizar cada repeticao.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-3 rounded-sm bg-[#ffffff] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6D28D9] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] hover:scale-[1.02]"
              >
                Start Pro Protocol
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-[#ffffff80]"
            >
              14 dias gratis &middot; Sem cartao necessario
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
