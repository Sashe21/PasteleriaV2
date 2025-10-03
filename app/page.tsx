"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import Navbar from "@/components/NavBar"
import { AppProvider } from "@/context/AppContext"

// Secciones principales de la pastelería
const SectionHome = dynamic(() => import("@/components/sections/SectionHome"), {
  loading: () => <div className="h-96 bg-pink-50 animate-pulse" />,
})
const SectionAboutUs = dynamic(() => import("@/components/sections/SectionAboutUs"), {
  loading: () => <div className="h-96 bg-pink-50 animate-pulse" />,
})
const SectionCatalog = dynamic(() => import("@/components/sections/SectionCatalog"), {
  loading: () => <div className="h-96 bg-pink-50 animate-pulse" />,
})
const SectionServices = dynamic(() => import("@/components/sections/SectionServices"), {
  loading: () => <div className="h-96 bg-pink-50 animate-pulse" />,
})
const SectionGallery = dynamic(() => import("@/components/sections/SectionGallery"), {
  loading: () => <div className="h-96 bg-pink-50 animate-pulse" />,
})
const SectionHowToBuy = dynamic(() => import("@/components/sections/SectionHowBuy"), {
  loading: () => <div className="h-96 bg-pink-50 animate-pulse" />,
})
const SectionContact = dynamic(() => import("@/components/sections/SectionContact"), {
  loading: () => <div className="h-96 bg-pink-50 animate-pulse" />,
})

export default function PasteleriaPage() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <Navbar />
        <main className="bg-[#fffaf0] overflow-x-hidden">
          <Suspense fallback={<div className="h-96 bg-pink-50 animate-pulse" />}>
            <SectionHome />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-pink-50 animate-pulse" />}>
            <SectionAboutUs />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-pink-50 animate-pulse" />}>
            <SectionCatalog />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-pink-50 animate-pulse" />}>
            <SectionGallery />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-pink-50 animate-pulse" />}>
            <SectionHowToBuy />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-pink-50 animate-pulse" />}>
            <SectionContact />
          </Suspense>
        </main>
      </div>
    </AppProvider>
  )
}
