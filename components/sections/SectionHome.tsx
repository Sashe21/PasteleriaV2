"use client"

import { useEffect, useState } from "react"

export default function SectionHome() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setIsClient(true)
    setWindowWidth(window.innerWidth)

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("change", handleResize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 },
    )

    const section = document.getElementById("welcome-section")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="welcome-section"
      className="relative w-full min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/Images/CakeInicial.jpg')",
        backgroundAttachment: isClient && windowWidth > 768 ? "fixed" : "scroll",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
        <div
          className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Texto principal */}
          <h1
            className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 sm:mb-6 tracking-wide drop-shadow-2xl leading-tight transition-all duration-1000`}
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            ¡Bienvenido a <span className="text-pink-200">Pasteleria Ines!</span>
          </h1>

          {/* Descripción */}
          <p
            className={`text-lg sm:text-2xl text-white mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Pasteles artesanales y postres hechos con amor. ¡Personaliza tu pedido o elige entre nuestros favoritos!
          </p>

          {/* Botones */}
          <div
            className={`flex justify-center gap-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <a
              href="#catalog"
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-lg font-semibold transition-all"
            >
              Ver Catálogo
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-white/90 hover:bg-white text-pink-700 rounded-full text-lg font-semibold transition-all"
            >
              Hacer Pedido
            </a>
          </div>
        </div>
      </div>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Cormorant+Garamond:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
    </section>
  )
}
