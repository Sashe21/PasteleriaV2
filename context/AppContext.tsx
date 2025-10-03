"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

interface Pastry {
  id: string
  name: string
  description: string
  price: string
  imageUrl: string
  ingredients: string[]
  allergens: string[]
}

interface CartItem extends Pastry {
  quantity: number
}

interface User {
  id: string
  name: string
  email: string
}

interface AppContextType {
  cart: CartItem[]
  favorites: Pastry[]
  searchTerm: string
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  addToCart: (pastry: Pastry) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  addToFavorites: (pastry: Pastry) => void
  removeFromFavorites: (id: string) => void
  setSearchTerm: (term: string) => void
  clearCart: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<Pastry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: "1",
      name: email.split("@")[0],
      email,
    })
  }

  const register = async (name: string, email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: "1",
      name,
      email,
    })
  }

  const logout = () => {
    setUser(null)
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    })
  }

  const addToCart = (pastry: Pastry) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === pastry.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === pastry.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...pastry, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const addToFavorites = (pastry: Pastry) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find((item) => item.id === pastry.id)
      if (exists) {
        return prevFavorites.filter((item) => item.id !== pastry.id)
      }
      return [...prevFavorites, pastry]
    })
  }

  const removeFromFavorites = (id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        favorites,
        searchTerm,
        user,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToFavorites,
        removeFromFavorites,
        setSearchTerm,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
