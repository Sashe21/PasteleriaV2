const SectionAboutUs = () => {
  return (
    <section
      id="about-us"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 py-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-gray-50"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Sobre Nosotros
          </h2>
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-4 h-4 border-2 border-pink-300 transform rotate-45"></div>
            <div className="w-4 h-4 border-2 border-pink-300 transform rotate-45"></div>
            <div className="w-4 h-4 border-2 border-pink-300 transform rotate-45"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Columna de la Imagen */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-pink-100 dark:bg-pink-900/20 rounded-2xl transform rotate-3"></div>
              <img
                src="/Images/Cake3.jpg"
                alt="Pastelería Ines - Sobre Nosotros"
                className="relative rounded-2xl shadow-2xl max-w-full h-auto object-cover md:max-h-[500px]"
              />
            </div>
          </div>

          {/* Columna de Información */}
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <div className="space-y-5">
              <p
                className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                En Pastelería Ines, cada creación es una obra de arte hecha con pasión y los ingredientes más frescos.
                Desde 20XX, nos hemos dedicado a endulzar los momentos especiales de nuestros clientes, ofreciendo
                pasteles artesanales y postres únicos que deleitan el paladar y el corazón.
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Nuestra misión es superar tus expectativas con sabores inolvidables y diseños personalizados. Ya sea
                para un cumpleaños, una boda o simplemente un capricho dulce, en Pastelería Ines encontrarás la
                perfección en cada bocado.
              </p>
            </div>

            <div className="inline-block bg-pink-100 dark:bg-pink-900/30 px-8 py-4 rounded-full">
              <p
                className="text-pink-600 dark:text-pink-400 font-semibold text-lg"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                ¡Ven y descubre la magia de nuestros postres!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionAboutUs
