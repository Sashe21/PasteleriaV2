import { Cake, Gift, HeartHandshake, Sparkles } from "lucide-react"

const SectionServices = () => {
  const services = [
    {
      icon: <Cake size={48} className="text-pink-600 dark:text-pink-400" />,
      title: "Pasteles Personalizados",
      description:
        "Diseñamos el pastel de tus sueños para cualquier ocasión especial, con sabores y decoraciones únicas.",
    },
    {
      icon: <Gift size={48} className="text-pink-600 dark:text-pink-400" />,
      title: "Postres y Dulces",
      description:
        "Una amplia variedad de postres individuales, galletas, macarons y dulces para complementar tu mesa.",
    },
    {
      icon: <HeartHandshake size={48} className="text-pink-600 dark:text-pink-400" />,
      title: "Eventos y Catering",
      description: "Servicio completo de pastelería para bodas, cumpleaños, eventos corporativos y celebraciones.",
    },
    {
      icon: <Sparkles size={48} className="text-pink-600 dark:text-pink-400" />,
      title: "Clases de Repostería",
      description: "Aprende los secretos de la repostería artesanal con nuestros talleres para todos los niveles.",
    },
  ]

  return (
    <section
      id="services"
      className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center p-8 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-50 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Nuestros Servicios
          </h2>
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-4 h-4 border-2 border-pink-300 transform rotate-45"></div>
            <div className="w-4 h-4 border-2 border-pink-300 transform rotate-45"></div>
            <div className="w-4 h-4 border-2 border-pink-300 transform rotate-45"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 mb-6 shadow-md">
                {service.icon}
              </div>
              <h3
                className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {service.title}
              </h3>
              <p
                className="text-base text-gray-600 dark:text-gray-300 leading-relaxed"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionServices
