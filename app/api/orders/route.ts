import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, items, total, address, phone, paymentMethod, shippingData } = body

    // Validar datos requeridos
    if (!userId || !items || !total || !address || !phone || !paymentMethod) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 })
    }

    // Crear el pedido
    const fullAddress = `${address}, ${shippingData.city}, ${shippingData.postalCode}`
    const orderResult = await query(
      "INSERT INTO orders (user_id, total, address, phone, payment_method, status) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, total, fullAddress, phone, paymentMethod, "pending"],
    )

    const orderId = (orderResult as any).insertId

    // Insertar los items del pedido
    for (const item of items) {
      await query("INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)", [
        orderId,
        item.name,
        item.quantity,
        item.price,
      ])
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Pedido creado exitosamente",
    })
  } catch (error) {
    console.error("Error al crear pedido:", error)
    return NextResponse.json({ error: "Error al procesar el pedido" }, { status: 500 })
  }
}

// Obtener pedidos de un usuario
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId es requerido" }, { status: 400 })
    }

    // Obtener pedidos del usuario
    const orders = await query(
      `SELECT o.*, 
        GROUP_CONCAT(
          JSON_OBJECT(
            'name', oi.product_name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC`,
      [userId],
    )

    // Parsear los items JSON
    const ordersWithItems = (orders as any[]).map((order) => ({
      ...order,
      items: order.items ? JSON.parse(`[${order.items}]`) : [],
    }))

    return NextResponse.json({ orders: ordersWithItems })
  } catch (error) {
    console.error("Error al obtener pedidos:", error)
    return NextResponse.json({ error: "Error al obtener pedidos" }, { status: 500 })
  }
}
