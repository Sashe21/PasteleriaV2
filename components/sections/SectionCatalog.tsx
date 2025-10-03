"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCartIcon } from "lucide-react"
import { useAppContext } from "@/context/AppContext"
import PastryDetailDialog from "./components/PastryDetail"

export default function SectionCatalog() {
  const { addToCart, addToFavorites, searchTerm } = useAppContext()
  const [selectedPastry, setSelectedPastry] = useState<any | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [visiblePastriesCount, setVisiblePastriesCount] = useState(6)

  const allPastries = [
    {
      id: "1",
      name: "Pastel de Goku",
      description: "Un clásico irresistible pastel del iconico anime Dragon  Ball.",
      price: "25.00",
      imageUrl: "/goku.jpg",
      ingredients: ["Harina", "Cacao", "Azúcar", "Huevos", "Mantequilla", "Chocolate belga"],
      allergens: ["Gluten", "Lácteos", "Huevo"],
    },
    {
      id: "2",
      name: "Pastel de Patricio Chichon",
      description: "Delicada tarta con crema pastelera ligera y fresas frescas de temporada, sobre una base crujiente de Patricio.",
      price: "28.50",
      imageUrl: "/patricio.jpg",
      ingredients: ["Harina", "Mantequilla", "Azúcar", "Huevos", "Leche", "Fresas"],
      allergens: ["Gluten", "Lácteos", "Huevo"],
    },
    {
      id: "3",
      name: "Cheesecake Minion",
      description: "Cremoso cheesecake horneado con dieseño de los famosos minions.",
      price: "30.00",
      imageUrl: "/minion.jpg",
      ingredients: ["Galletas", "Mantequilla", "Queso crema", "Azúcar", "Huevos", "Arándanos"],
      allergens: ["Gluten", "Lácteos", "Huevo"],
    },
    {
      id: "4",
      name: "Cupcakes Variados",
      description: "Caja de 6 cupcakes con sabores y decoraciones sorpresa, perfectos para compartir o regalar.",
      price: "18.00",
      imageUrl: "/placeholder.svg",
      ingredients: ["Harina", "Azúcar", "Huevos", "Mantequilla", "Leche", "Vainilla", "Colorantes"],
      allergens: ["Gluten", "Lácteos", "Huevo"],
    },
    {
      id: "5",
      name: "Macarons Surtidos",
      description: "Exquisitos macarons franceses en una variedad de sabores y colores vibrantes.",
      price: "22.00",
      imageUrl: "/placeholder.svg",
      ingredients: ["Almendras", "Azúcar glas", "Clara de huevo", "Azúcar", "Colorantes", "Rellenos variados"],
      allergens: ["Frutos secos", "Huevo"],
    },
    {
      id: "6",
      name: "Tarta de Limón Merengada",
      description: "Refrescante tarta de limón con una capa de merengue suizo tostado a la perfección.",
      price: "27.00",
      imageUrl: "/placeholder.svg",
      ingredients: ["Harina", "Mantequilla", "Azúcar", "Limón", "Huevos", "Clara de huevo"],
      allergens: ["Gluten", "Lácteos", "Huevo"],
    },
    {
      id: "7",
      name: "Red Velvet Cake",
      description: "Un pastel de terciopelo rojo húmedo con un glaseado de queso crema suave y delicioso.",
      price: "32.00",
      imageUrl: "/placeholder.svg",
      ingredients: ["Harina", "Cacao", "Suero de leche", "Vinagre", "Colorante rojo", "Queso crema"],
      allergens: ["Gluten", "Lácteos", "Huevo"],
    },
    {
      id: "8",
      name: "Tarta de Zanahoria y Nuez",
      description: "Jugosa tarta de zanahoria con especias, nueces y un glaseado de queso crema.",
      price: "29.50",
      imageUrl: "/placeholder.svg",
      ingredients: ["Harina", "Zanahoria", "Nueces", "Canela", "Queso crema", "Azúcar"],
      allergens: ["Gluten", "Lácteos", "Huevo", "Frutos secos"],
    },
    {
      id: "9",
      name: "Éclairs de Café",
      description: "Delicados éclairs rellenos de crema pastelera de café y cubiertos con glaseado de chocolate.",
      price: "15.00",
      imageUrl: "/placeholder.svg",
      ingredients: ["Harina", "Mantequilla", "Huevos", "Leche", "Café", "Chocolate"],
      allergens: ["Gluten", "Lácteos", "Huevo"],
    },
    {
      id: "10",
      name: "Tarta Selva Negra",
      description: "Clásico pastel alemán con capas de bizcocho de chocolate, cerezas y crema batida.",
      price: "35.00",
      imageUrl: "/placeholder.svg",
      ingredients: ["Harina", "Cacao", "Huevos", "Crema de leche", "Cerezas", "Kirsch"],
      allergens: ["Gluten", "Lácteos", "Huevo"],
    },
    {
      id: "11",
      name: "Mousse de Maracuyá",
      description: "Ligera y refrescante mousse de maracuyá con una base de galleta crujiente.",
      price: "26.00",
      imageUrl: "/placeholder.svg",
      ingredients: ["Maracuyá", "Crema de leche", "Azúcar", "Gelatina", "Galletas"],
      allergens: ["Lácteos", "Gluten"],
    },
    {
      id: "12",
      name: "Brownies de Chocolate y Nuez",
      description: "Intensos brownies de chocolate con trozos de nuez, perfectos para los amantes del cacao.",
      price: "12.00",
      imageUrl: "/placeholder.svg",
      ingredients: ["Chocolate", "Mantequilla", "Azúcar", "Huevos", "Harina", "Nueces"],
      allergens: ["Gluten", "Lácteos", "Huevo", "Frutos secos"],
    },
  ]

  const filteredPastries = allPastries
    .filter(
      (pastry) =>
        pastry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pastry.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, visiblePastriesCount)

  const handleViewDetails = (pastry: any) => {
    setSelectedPastry(pastry)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setSelectedPastry(null)
  }

  const handleLoadMore = () => {
    setVisiblePastriesCount((prevCount) => prevCount + 3)
  }

  const hasMorePastries = visiblePastriesCount < allPastries.length

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-center">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-50 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Nuestro Delicioso Catálogo
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
            Descubre nuestra selección de pasteles y postres artesanales, perfectos para cualquier ocasión.
          </p>
        </div>

        {filteredPastries.length === 0 ? (
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No se encontraron pasteles que coincidan con tu búsqueda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPastries.map((pastry) => (
              <div
                key={pastry.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={pastry.imageUrl || "/placeholder.svg"}
                    alt={pastry.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-pink-600 dark:text-pink-400 rounded-full shadow-md"
                      onClick={() => addToFavorites(pastry)}
                    >
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Añadir a favoritos</span>
                    </Button>
                  </div>
                </div>
                <div className="p-6 text-left">
                  <h3
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {pastry.name}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {pastry.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-pink-600 dark:text-pink-400">${pastry.price}</span>
                    <Button
                      size="icon"
                      className="bg-pink-100 dark:bg-pink-900/30 hover:bg-pink-200 dark:hover:bg-pink-900/50 text-pink-600 dark:text-pink-400 rounded-full"
                      onClick={() => addToCart(pastry)}
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span className="sr-only">Añadir al carrito</span>
                    </Button>
                  </div>
                  <Button
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 rounded-full transition-colors shadow-md"
                    onClick={() => handleViewDetails(pastry)}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasMorePastries && (
          <div className="mt-12">
            <Button
              onClick={handleLoadMore}
              className="px-10 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Ver Más Pasteles
            </Button>
          </div>
        )}
      </div>
      <PastryDetailDialog pastry={selectedPastry} isOpen={isDetailDialogOpen} onClose={handleCloseDetailDialog} />
    </section>
  )
}
