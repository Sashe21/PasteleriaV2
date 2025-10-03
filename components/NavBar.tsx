"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, Heart, Search, User, LogOut, UserCircle, Package, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppContext } from "@/context/AppContext"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LoginDialog from "@/components/auth/LoginDialog"
import RegisterDialog from "@/components/auth/RegisterDialog"
import ProfileDialog from "@/components/ProfileDialog"
import CheckoutDialog from "@/components/CheckoutDialog"
import { useToast } from "@/hooks/use-toast"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())
  const { toast } = useToast()
  const { cart, favorites, searchTerm, setSearchTerm, user, logout, addToCart, removeFromCart, removeFromFavorites } =
    useAppContext()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#about-us", label: "Nosotros" },
    { href: "#catalog", label: "Catálogo" },
    { href: "#gallery", label: "Galería" },
    { href: "#how-to-buy", label: "Cómo Comprar" },
    { href: "#contact", label: "Contacto" },
  ]

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    if (!user) {
      setShowLoginDialog(true)
    } else {
      setShowCheckoutDialog(true)
    }
  }

  const handleAddToCartFromFavorites = (item: any) => {
    setRemovingItems((prev) => new Set(prev).add(item.id))
    addToCart(item)

    setTimeout(() => {
      removeFromFavorites(item.id)
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(item.id)
        return newSet
      })
      toast({
        title: "Agregado al carrito",
        description: `${item.name} se agregó al carrito y se eliminó de favoritos`,
      })
    }, 300)
  }

  const handleRemoveFromCart = (itemId: string) => {
    setRemovingItems((prev) => new Set(prev).add(itemId))

    setTimeout(() => {
      removeFromCart(itemId)
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
      toast({
        title: "Eliminado del carrito",
        description: "El producto se eliminó del carrito",
      })
    }, 300)
  }

  const handleRemoveFromFavorites = (itemId: string) => {
    setRemovingItems((prev) => new Set(prev).add(itemId))

    setTimeout(() => {
      removeFromFavorites(itemId)
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
      toast({
        title: "Eliminado de favoritos",
        description: "El producto se eliminó de favoritos",
      })
    }, 300)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#home"
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent transition-transform hover:scale-105 duration-300"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Pastelería Ines
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-200 hover:scale-105 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-rose-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Search and Icons */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-pink-500" />
                <Input
                  type="text"
                  placeholder="Buscar pasteles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-48 lg:w-56 h-9 border-gray-200 focus:border-pink-300 focus:ring-pink-200 transition-all duration-300"
                />
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-pink-50 dark:hover:bg-pink-950 transition-all duration-200 hover:scale-110"
                  >
                    <Heart className="h-5 w-5 text-gray-700 dark:text-gray-200 transition-transform hover:scale-110" />
                    {favorites.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-md animate-pulse">
                        {favorites.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-xl font-bold">Favoritos</SheetTitle>
                    <SheetDescription>Tus pasteles favoritos guardados</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {favorites.length === 0 ? (
                      <div className="text-center py-12 animate-fade-in">
                        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3 animate-pulse" />
                        <p className="text-gray-500">No tienes favoritos aún</p>
                      </div>
                    ) : (
                      favorites.map((item) => (
                        <div
                          key={item.id}
                          className={`flex gap-4 items-center p-3 rounded-lg border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all duration-300 ${
                            removingItems.has(item.id) ? "opacity-0 scale-95" : "opacity-100 scale-100"
                          }`}
                        >
                          <img
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg shadow-sm transition-transform hover:scale-105 duration-300"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm font-medium text-pink-600">${item.price}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddToCartFromFavorites(item)}
                              className="bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white h-8 px-3 transition-all duration-200 hover:scale-105 hover:shadow-md"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Agregar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveFromFavorites(item.id)}
                              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 h-8 px-3 transition-all duration-200 hover:scale-105"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Quitar
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-pink-50 dark:hover:bg-pink-950 transition-all duration-200 hover:scale-110"
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-200 transition-transform hover:scale-110" />
                    {totalCartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-md animate-pulse">
                        {totalCartItems}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-xl font-bold">Carrito de Compras</SheetTitle>
                    <SheetDescription>
                      {totalCartItems} {totalCartItems === 1 ? "artículo" : "artículos"}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12 animate-fade-in">
                        <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3 animate-pulse" />
                        <p className="text-gray-500">Tu carrito está vacío</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className={`flex gap-4 items-center p-3 rounded-lg border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all duration-300 ${
                                removingItems.has(item.id) ? "opacity-0 scale-95" : "opacity-100 scale-100"
                              }`}
                            >
                              <img
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg shadow-sm transition-transform hover:scale-105 duration-300"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <p className="text-sm font-medium text-pink-600">
                                  ${item.price} x {item.quantity}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:scale-110"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 border-t space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">Total:</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                              $
                              {cart
                                .reduce((sum, item) => sum + Number.parseFloat(item.price) * item.quantity, 0)
                                .toFixed(2)}
                            </span>
                          </div>
                          <Button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                          >
                            Proceder al Pago
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-pink-50 dark:hover:bg-pink-950 transition-all duration-200 hover:scale-110"
                    >
                      <User className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setShowProfileDialog(true)}
                      className="cursor-pointer transition-colors"
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      Mi Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer transition-colors">
                      <Package className="mr-2 h-4 w-4" />
                      Mis Pedidos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer transition-colors">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLoginDialog(true)}
                    className="text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 hover:scale-105"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowRegisterDialog(true)}
                    className="bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    Registrarse
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-pink-50 transition-all duration-200 hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-4 border-t pt-4 animate-fade-in">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-pink-500" />
                <Input
                  type="text"
                  placeholder="Buscar pasteles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {!user && (
                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowLoginDialog(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    onClick={() => {
                      setShowRegisterDialog(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600"
                  >
                    Registrarse
                  </Button>
                </div>
              )}
              {user && (
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium text-gray-900 mb-2">{user.name}</p>
                  <Button variant="outline" onClick={logout} className="w-full text-red-600 bg-transparent">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onSwitchToRegister={() => setShowRegisterDialog(true)}
      />
      <RegisterDialog
        open={showRegisterDialog}
        onOpenChange={setShowRegisterDialog}
        onSwitchToLogin={() => setShowLoginDialog(true)}
      />
      <ProfileDialog open={showProfileDialog} onOpenChange={setShowProfileDialog} />
      <CheckoutDialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog} />
    </>
  )
}
