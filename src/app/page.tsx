"use client"

//* Components imports
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { TechShowcase } from "@/components/landing/tech-showcase"
import { EliteCta } from "@/components/landing/elite-cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden font-sans" id="landing-page-root">
      <Navbar />
      <Hero />
      <Features />
      <TechShowcase />
      <EliteCta />
      <Footer />
    </main>
  )
}
