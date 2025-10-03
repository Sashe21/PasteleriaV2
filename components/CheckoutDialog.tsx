"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useAppContext } from "@/context/AppContext"
import { CreditCard, Wallet, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { cart, clearCart, user } = useAppContext()
  const { toast } = useToast()
  const [step, setStep] = useState<"shipping" | "payment" | "success">("shipping")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingData, setShippingData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const subtotal = cart.reduce((sum, item) => sum + Number.parseFloat(item.price) * item.quantity, 0)
  const shipping = 50
  const total = subtotal + shipping

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("success")
    setTimeout(() => {
      clearCart()
      onOpenChange(false)
      setStep("shipping")
      toast({
        title: "Pedido realizado con éxito",
        description: "Recibirás un correo de confirmación pronto",
      })
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            {step === "success" ? "Pedido Confirmado" : "Finalizar Compra"}
          </DialogTitle>
          <DialogDescription>
            {step === "shipping" && "Ingresa tus datos de envío"}
            {step === "payment" && "Selecciona tu método de pago"}
            {step === "success" && "Tu pedido ha sido procesado exitosamente"}
          </DialogDescription>
        </DialogHeader>

        {step === "success" ? (
          <div className="text-center py-12">
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Gracias por tu compra!</h3>
            <p className="text-gray-600 mb-4">Tu pedido está siendo procesado</p>
            <p className="text-sm text-gray-500">Recibirás un correo de confirmación en breve</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Side - Form */}
            <div className="space-y-6">
              {step === "shipping" && (
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-pink-600" />
                      Nombre Completo
                    </Label>
                    <Input
                      id="name"
                      required
                      value={shippingData.name}
                      onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                      className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-pink-600" />
                      Correo Electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={shippingData.email}
                      onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-pink-600" />
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      placeholder="+52 123 456 7890"
                      className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-pink-600" />
                      Dirección
                    </Label>
                    <Input
                      id="address"
                      required
                      value={shippingData.address}
                      onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                      placeholder="Calle y número"
                      className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input
                        id="city"
                        required
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input
                        id="postalCode"
                        required
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                        className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600"
                  >
                    Continuar al Pago
                  </Button>
                </form>
              )}

              {step === "payment" && (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <Label>Método de Pago</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-pink-600" />
                          Tarjeta de Crédito/Débito
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Wallet className="h-5 w-5 text-pink-600" />
                          Pago en Efectivo (Contra Entrega)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                          className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Fecha de Expiración</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            required
                            className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            required
                            className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep("shipping")} className="flex-1">
                      Volver
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600"
                    >
                      Confirmar Pedido
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Side - Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-pink-600">
                      ${(Number.parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
