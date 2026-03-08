"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { Activity } from "lucide-react"

//* CONSTANTS * //
const footerLinks = [
  {
    heading: "PRODUTO",
    links: ["Recursos", "Precos", "Integracoes", "Changelog"],
  },
  {
    heading: "EMPRESA",
    links: ["Sobre", "Blog", "Carreiras", "Contato"],
  },
  {
    heading: "LEGAL",
    links: ["Privacidade", "Termos", "Cookies"],
  },
]

export function Footer() {
  return (
    <footer className="relative" id="main-footer">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-10 md:grid-cols-4"
          id="footer-links-grid"
        >
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1" id="footer-brand-column">
            <a href="#" className="flex items-center gap-2 group" id="footer-logo">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
                Lyft
              </span>
            </a>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground leading-5">
              Engineering Human Excellence
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.heading} id={`footer-column-${group.heading.toLowerCase()}`}>
              <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                {group.heading}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      id={`footer-link-${link.toLowerCase().replace(/\s+/g, "-")}`}
                      href="#"
                      className="text-[11px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center gap-4 pt-8 md:flex-row md:justify-between" id="footer-bottom-bar">
          <p className="text-[10px] text-muted-foreground tracking-wider" id="copyright-text">
            &copy; {new Date().getFullYear()} Lyft. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1" id="system-status-indicator">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
              Sistema Operacional
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
