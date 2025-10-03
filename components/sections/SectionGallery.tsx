"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

const SectionGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    "/elegant-chocolate-cake.jpg",
    "/strawberry-tart.jpg",
    "/colorful-macarons.jpg",
    "/elegant-wedding-cake.png",
    "/cupcakes-assortment.jpg",
    "/lemon-meringue-pie.jpg",
    "/red-velvet-cake.png",
    "/cheesecake-with-berries.png",
    "/chocolate-eclairs.jpg",
  ]

  return (
    <section
      id="gallery"
      className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center p-8 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16">
          <h2
            className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-50 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Nuestra Galería
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
            Inspírate con algunas de nuestras creaciones más destacadas y pasteles personalizados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Pastel ${index + 1}`}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white text-xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
                  Ver Imagen
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Vista ampliada"
              className="w-full h-auto object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default SectionGallery
