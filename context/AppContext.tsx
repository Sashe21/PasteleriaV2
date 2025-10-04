"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
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
  role?: string // added role field to User interface
}

interface AppContextType {
  cart: CartItem[]
  favorites: Pastry[]
  searchTerm: string
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  addToCart: (pastry: Pastry) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  updateCartQuantity: (id: string, quantity: number) => Promise<void>
  addToFavorites: (pastry: Pastry) => Promise<void>
  removeFromFavorites: (id: string) => Promise<void>
  setSearchTerm: (term: string) => void
  clearCart: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<Pastry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      loadFavorites()
      loadCart()
    } else {
      localStorage.removeItem("user")
      setFavorites([])
      setCart([])
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadFavorites()
      loadCart()
    } else {
      setFavorites([])
      setCart([])
    }
  }, [user])

  const loadFavorites = async () => {
    if (!user) return
    try {
      const response = await fetch(`/api/favorites?userId=${user.id}`)
      const data = await response.json()
      if (response.ok) {
        const favs = data.favorites.map((fav: any) => ({
          id: fav.product_name,
          name: fav.product_name,
          imageUrl: fav.product_image,
          description: "",
          price: "0",
          ingredients: [],
          allergens: [],
        }))
        setFavorites(favs)
      }
    } catch (error) {
      console.error("Error al cargar favoritos:", error)
    }
  }

  const loadCart = async () => {
    if (!user) return
    try {
      const response = await fetch(`/api/cart?userId=${user.id}`)
      const data = await response.json()
      if (response.ok) {
        const cartItems = data.cart.map((item: any) => ({
          id: item.product_name,
          name: item.product_name,
          imageUrl: item.product_image,
          description: item.product_description || "",
          price: item.product_price.toString(),
          quantity: item.quantity,
          ingredients: [],
          allergens: [],
        }))
        setCart(cartItems)
      }
    } catch (error) {
      console.error("Error al cargar carrito:", error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.error || "Error al iniciar sesión",
          variant: "destructive",
        })
        throw new Error(data.error)
      }

      setUser(data.user)
      toast({
        title: "Bienvenido",
        description: `Has iniciado sesión como ${data.user.name}`,
      })
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.error || "Error al registrar usuario",
          variant: "destructive",
        })
        throw new Error(data.error)
      }

      setUser(data.user)
      toast({
        title: "Cuenta creada",
        description: `Bienvenido ${data.user.name}`,
      })
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    })
  }

  const addToCart = async (pastry: Pastry) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === pastry.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === pastry.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...pastry, quantity: 1 }]
    })

    if (user) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            productName: pastry.name,
            productImage: pastry.imageUrl,
            productPrice: Number.parseFloat(pastry.price),
            productDescription: pastry.description,
            quantity: 1,
          }),
        })
      } catch (error) {
        console.error("Error al sincronizar carrito:", error)
      }
    }
  }

  const removeFromCart = async (id: string) => {
    const item = cart.find((item) => item.id === id)
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))

    if (user && item) {
      try {
        await fetch(`/api/cart?userId=${user.id}&productName=${item.name}`, {
          method: "DELETE",
        })
      } catch (error) {
        console.error("Error al sincronizar carrito:", error)
      }
    }
  }

  const updateCartQuantity = async (id: string, quantity: number) => {
    const item = cart.find((item) => item.id === id)

    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))

    if (user && item) {
      try {
        await fetch("/api/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            productName: item.name,
            quantity,
          }),
        })
      } catch (error) {
        console.error("Error al sincronizar carrito:", error)
      }
    }
  }

  const addToFavorites = async (pastry: Pastry) => {
    const exists = favorites.find((item) => item.id === pastry.id)

    if (exists) {
      setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== pastry.id))

      if (user) {
        try {
          await fetch(`/api/favorites?userId=${user.id}&productName=${pastry.name}`, {
            method: "DELETE",
          })
        } catch (error) {
          console.error("Error al sincronizar favoritos:", error)
        }
      }
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, pastry])

      if (user) {
        try {
          await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              productName: pastry.name,
              productImage: pastry.imageUrl,
            }),
          })
        } catch (error) {
          console.error("Error al sincronizar favoritos:", error)
        }
      }
    }
  }

  const removeFromFavorites = async (id: string) => {
    const item = favorites.find((item) => item.id === id)
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== id))

    if (user && item) {
      try {
        await fetch(`/api/favorites?userId=${user.id}&productName=${item.name}`, {
          method: "DELETE",
        })
      } catch (error) {
        console.error("Error al sincronizar favoritos:", error)
      }
    }
  }

  const clearCart = () => {
    setCart([])
  }

  if (isLoading) {
    return null
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
