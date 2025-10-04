import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }

    // Verificar que el usuario sea admin
    const userResult = await query("SELECT role FROM users WHERE id = ?", [userId])
    if (!userResult || userResult.length === 0 || userResult[0].role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    // Obtener todos los pedidos con información del usuario
    const orders = await query(
      `SELECT o.*, u.name as user_name, u.email as user_email 
       FROM orders o 
       JOIN users u ON o.user_id = u.id 
       ORDER BY o.created_at DESC`,
    )

    // Obtener items de cada pedido
    for (const order of orders) {
      const items = await query("SELECT * FROM order_items WHERE order_id = ?", [order.id])
      order.items = items
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error al obtener pedidos:", error)
    return NextResponse.json({ error: "Error al obtener pedidos" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { orderId, status, userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }

    // Verificar que el usuario sea admin
    const userResult = await query("SELECT role FROM users WHERE id = ?", [userId])
    if (!userResult || userResult.length === 0 || userResult[0].role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    await query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al actualizar pedido:", error)
    return NextResponse.json({ error: "Error al actualizar pedido" }, { status: 500 })
  }
}
