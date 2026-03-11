"use client"

//* Libraries imports
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Menu, X } from "lucide-react"

//* CONSTANTS * //
const navLinks = [
  { label: "TECNOLOGIA", href: "#features" },
  { label: "PROTOCOLO", href: "#tech" },
]

export function Navbar() {
  //* HOOKS * //
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#050505] shadow-2xl transition-all duration-500"
      id="main-navbar"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" id="navbar-logo">
          <div className="relative">
            <Activity className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 h-6 w-6 bg-primary/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
            Lyft
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex" id="navbar-links-desktop">
          {navLinks.map((link) => (
            <a
              key={link.label}
              id={`navbar-link-${link.label.toLowerCase()}`}
              href={link.href}
              className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            id="navbar-login-button"
            href="/login"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground px-5 py-2.5 rounded-sm transition-all duration-300 hover:text-primary"
          >
            Login
          </a>
          <a
            id="navbar-signup-button"
            href="/signup"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground bg-primary px-5 py-2.5 rounded-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(139,92,246,0.4)]"
          >
            Registrar
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
            id="navbar-mobile-menu"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  id={`navbar-mobile-link-${link.label.toLowerCase()}`}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <a
                  id="navbar-mobile-login"
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground px-5 py-3 rounded-sm text-center hover:text-primary transition-colors"
                >
                  Login
                </a>
                <a
                  id="navbar-mobile-signup"
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground bg-primary px-5 py-3 rounded-sm text-center"
                >
                  Registrar
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
