"use client"
import { useEffect, useState } from "react"
import { ShoppingBag, User, CreditCard, Home } from "lucide-react"

const SectionHowToBuy = () => {
  const [isClient, setIsClient] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setIsClient(true)
    setWindowWidth(window.innerWidth)

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const steps = [
    {
      icon: <ShoppingBag size={48} className="text-pink-600 dark:text-pink-400" />,
      title: "1. Agrega tus creaciones favoritas al carrito",
      description:
        "Explora nuestro delicioso catálogo y selecciona los pasteles que más te gusten. Añádelos a tu carrito con un simple clic.",
    },
    {
      icon: <User size={48} className="text-pink-600 dark:text-pink-400" />,
      title: "2. Ingresa tus datos y elige tu forma de pago",
      description:
        "Completa tus datos de envío y selecciona el método de pago que prefieras de forma segura y sencilla.",
    },
    {
      icon: <CreditCard size={48} className="text-pink-600 dark:text-pink-400" />,
      title: "3. Realiza el pago de tu pedido",
      description: "Confirma tu compra y procesa el pago. Recibirás una confirmación detallada por correo electrónico.",
    },
    {
      icon: <Home size={48} className="text-pink-600 dark:text-pink-400" />,
      title: "4. ¡Recibe tus delicias en casa!",
      description:
        "Relájate y espera. Tus pasteles serán preparados con amor y entregados directamente en la puerta de tu hogar.",
    },
  ]

  return (
    <section
      id="how-to-buy"
      className="min-h-screen flex flex-col items-center justify-center relative text-white p-8 py-20 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/Images/Cake3.jpg')",
        backgroundAttachment: isClient && windowWidth > 768 ? "fixed" : "scroll",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mb-12">
        <h2
          className="text-6xl font-extrabold mb-4 text-white drop-shadow-2xl"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          ¿Cómo Comprar?
        </h2>
        {/* Elemento decorativo de diamantes */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="w-4 h-4 border-2 border-pink-200 transform rotate-45"></div>
          <div className="w-4 h-4 border-2 border-pink-200 transform rotate-45"></div>
          <div className="w-4 h-4 border-2 border-pink-200 transform rotate-45"></div>
          <div className="w-4 h-4 border-2 border-pink-200 transform rotate-45"></div>
        </div>

        <div className="relative bg-pink-500/90 text-white py-3 px-8 text-center font-semibold uppercase tracking-wide text-lg inline-block rounded-full shadow-lg backdrop-blur-sm">
          <span className="relative z-10" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Comprar en Pasteleria Ines es muy fácil
          </span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mt-16">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-pink-100 mb-6 shadow-md">
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
              {step.title}
            </h3>
            <p className="text-base text-white/90" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectionHowToBuy
