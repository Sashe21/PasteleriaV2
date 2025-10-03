"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { useAppContext } from "@/context/AppContext"

interface Pastry {
  id: string
  name: string
  description: string
  price: string
  imageUrl: string
  ingredients: string[]
  allergens: string[]
}

interface PastryDetailDialogProps {
  pastry: Pastry | null
  isOpen: boolean
  onClose: () => void
}

export default function PastryDetailDialog({ pastry, isOpen, onClose }: PastryDetailDialogProps) {
  const { addToCart, addToFavorites } = useAppContext()

  if (!pastry) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-pink-700">{pastry.name}</DialogTitle>
          <DialogDescription>{pastry.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <img
            src={pastry.imageUrl || "/placeholder.svg"}
            alt={pastry.name}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div>
            <h3 className="text-xl font-semibold mb-2">Ingredientes</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {pastry.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Alérgenos</h3>
            <div className="flex flex-wrap gap-2">
              {pastry.allergens.map((allergen, index) => (
                <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                  {allergen}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-3xl font-bold text-pink-600">${pastry.price}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => addToFavorites(pastry)}>
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                className="bg-pink-600 hover:bg-pink-700"
                onClick={() => {
                  addToCart(pastry)
                  onClose()
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Añadir al Carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
