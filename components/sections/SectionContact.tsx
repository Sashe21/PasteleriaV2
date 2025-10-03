"use client"

import type React from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactSectionProps {
  id: string
}

const SectionContact: React.FC<ContactSectionProps> = ({ id }) => {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8 py-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-50 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Contáctanos
          </h2>
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-4 h-4 border-2 border-pink-300 transform rotate-45"></div>
            <div className="w-4 h-4 border-2 border-pink-300 transform rotate-45"></div>
            <div className="w-4 h-4 border-2 border-pink-300 transform rotate-45"></div>
          </div>
          <p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            ¿Tienes alguna pregunta o quieres hacer un pedido especial? ¡Estamos aquí para ayudarte!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Información de Contacto */}
          <div className="lg:w-1/2">
            <div className="bg-pink-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Nuestra Información
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="text-left">
                    <p
                      className="font-semibold text-gray-900 dark:text-white mb-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Dirección
                    </p>
                    <p className="text-gray-700 dark:text-gray-300" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                      Calle Falsa 123, Ciudad Ficticia, País
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 flex-shrink-0">
                    <Phone className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="text-left">
                    <p
                      className="font-semibold text-gray-900 dark:text-white mb-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Teléfono
                    </p>
                    <p className="text-gray-700 dark:text-gray-300" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                      +123 456 7890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 flex-shrink-0">
                    <Mail className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="text-left">
                    <p
                      className="font-semibold text-gray-900 dark:text-white mb-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Email
                    </p>
                    <p className="text-gray-700 dark:text-gray-300" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                      info@pasteleriaines.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 flex-shrink-0">
                    <Clock className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="text-left">
                    <p
                      className="font-semibold text-gray-900 dark:text-white mb-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Horario
                    </p>
                    <p className="text-gray-700 dark:text-gray-300" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                      Lun - Sáb: 9:00 AM - 7:00 PM
                      <br />
                      Domingo: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Envíanos un Mensaje
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    Tu Nombre
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    Tu Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    Tu Mensaje
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={5}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionContact
