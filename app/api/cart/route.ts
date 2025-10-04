import { NextResponse } from "next/server"
import { query } from "@/lib/db"

// GET - Obtener carrito del usuario
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID requerido" }, { status: 400 })
    }

    const cart = await query("SELECT * FROM cart WHERE user_id = ? ORDER BY created_at DESC", [userId])

    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error al obtener carrito:", error)
    return NextResponse.json({ error: "Error al obtener carrito" }, { status: 500 })
  }
}

// POST - Agregar al carrito
export async function POST(request: Request) {
  try {
    const { userId, productName, productImage, productPrice, productDescription, quantity } = await request.json()

    if (!userId || !productName || !productPrice) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    await query(
      `INSERT INTO cart (user_id, product_name, product_image, product_price, product_description, quantity) 
       VALUES (?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [userId, productName, productImage, productPrice, productDescription, quantity || 1],
    )

    return NextResponse.json({ message: "Agregado al carrito" })
  } catch (error) {
    console.error("Error al agregar al carrito:", error)
    return NextResponse.json({ error: "Error al agregar al carrito" }, { status: 500 })
  }
}

// PUT - Actualizar cantidad en carrito
export async function PUT(request: Request) {
  try {
    const { userId, productName, quantity } = await request.json()

    if (!userId || !productName || quantity === undefined) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    if (quantity <= 0) {
      await query("DELETE FROM cart WHERE user_id = ? AND product_name = ?", [userId, productName])
    } else {
      await query("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_name = ?", [
        quantity,
        userId,
        productName,
      ])
    }

    return NextResponse.json({ message: "Carrito actualizado" })
  } catch (error) {
    console.error("Error al actualizar carrito:", error)
    return NextResponse.json({ error: "Error al actualizar carrito" }, { status: 500 })
  }
}

// DELETE - Eliminar del carrito
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const productName = searchParams.get("productName")

    if (!userId || !productName) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    await query("DELETE FROM cart WHERE user_id = ? AND product_name = ?", [userId, productName])

    return NextResponse.json({ message: "Eliminado del carrito" })
  } catch (error) {
    console.error("Error al eliminar del carrito:", error)
    return NextResponse.json({ error: "Error al eliminar del carrito" }, { status: 500 })
  }
}
