"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAppContext } from "@/context/AppContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Users, ShoppingCart, ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminPage() {
  const { user } = useAppContext()
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [productDialogOpen, setProductDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
    loadData()
  }, [user])

  const loadData = async () => {
    if (!user) return

    try {
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        fetch(`/api/admin/orders?userId=${user.id}`),
        fetch(`/api/admin/users?userId=${user.id}`),
        fetch(`/api/admin/products?userId=${user.id}`),
      ])

      if (!ordersRes.ok || !usersRes.ok || !productsRes.ok) {
        toast({
          title: "Error",
          description: "No tienes permisos de administrador",
          variant: "destructive",
        })
        router.push("/")
        return
      }

      const ordersData = await ordersRes.json()
      const usersData = await usersRes.json()
      const productsData = await productsRes.json()

      setOrders(ordersData.orders)
      setUsers(usersData.users)
      setProducts(productsData.products)
    } catch (error) {
      console.error("Error al cargar datos:", error)
      toast({
        title: "Error",
        description: "Error al cargar datos del panel",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status, userId: user?.id }),
      })

      if (response.ok) {
        toast({
          title: "Estado actualizado",
          description: "El estado del pedido ha sido actualizado",
        })
        loadData()
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error)
      toast({
        title: "Error",
        description: "Error al actualizar el estado",
        variant: "destructive",
      })
    }
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = "/api/admin/products"
      const method = editingProduct ? "PUT" : "POST"
      const body = editingProduct
        ? { ...productForm, productId: editingProduct.id, userId: user?.id }
        : { ...productForm, userId: user?.id }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast({
          title: editingProduct ? "Producto actualizado" : "Producto creado",
          description: `El producto ha sido ${editingProduct ? "actualizado" : "creado"} exitosamente`,
        })
        setProductDialogOpen(false)
        setEditingProduct(null)
        setProductForm({ name: "", description: "", price: "", image: "", category: "" })
        loadData()
      }
    } catch (error) {
      console.error("Error al guardar producto:", error)
      toast({
        title: "Error",
        description: "Error al guardar el producto",
        variant: "destructive",
      })
    }
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
    })
    setProductDialogOpen(true)
  }

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return

    try {
      const response = await fetch(`/api/admin/products?userId=${user?.id}&productId=${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Producto eliminado",
          description: "El producto ha sido eliminado exitosamente",
        })
        loadData()
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error)
      toast({
        title: "Error",
        description: "Error al eliminar el producto",
        variant: "destructive",
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProductForm({ ...productForm, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-pink-900">Panel de Administración</h1>
            <p className="text-muted-foreground mt-2">Gestiona pedidos, usuarios y productos</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">Pedidos registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Usuarios registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Productos en catálogo</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recientes</CardTitle>
                <CardDescription>Gestiona y actualiza el estado de los pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.user_name}</div>
                            <div className="text-sm text-muted-foreground">{order.user_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status === "pending"
                              ? "Pendiente"
                              : order.status === "completed"
                                ? "Completado"
                                : "Cancelado"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {order.status === "pending" && (
                              <Button size="sm" onClick={() => updateOrderStatus(order.id, "completed")}>
                                Completar
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuarios Registrados</CardTitle>
                <CardDescription>Lista de todos los usuarios del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Fecha de registro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>#{user.id}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                            {user.role === "admin" ? "Admin" : "Usuario"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Productos</CardTitle>
                    <CardDescription>Gestiona el catálogo de productos</CardDescription>
                  </div>
                  <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setEditingProduct(null)
                          setProductForm({ name: "", description: "", price: "", image: "", category: "" })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Producto
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingProduct ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
                        <DialogDescription>
                          {editingProduct ? "Modifica los datos del producto" : "Agrega un nuevo producto al catálogo"}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleProductSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nombre</Label>
                          <Input
                            id="name"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Descripción</Label>
                          <Textarea
                            id="description"
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Precio</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Categoría</Label>
                          <Select
                            value={productForm.category}
                            onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pasteles">Pasteles</SelectItem>
                              <SelectItem value="Cupcakes">Cupcakes</SelectItem>
                              <SelectItem value="Galletas">Galletas</SelectItem>
                              <SelectItem value="Postres">Postres</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="image">Imagen</Label>
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mb-2"
                          />
                          <Input
                            placeholder="O pega una URL de imagen"
                            value={productForm.image}
                            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          />
                          {productForm.image && (
                            <div className="mt-2">
                              <img
                                src={productForm.image || "/placeholder.svg"}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1">
                            {editingProduct ? "Actualizar" : "Crear"} Producto
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setProductDialogOpen(false)}>
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagen</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
