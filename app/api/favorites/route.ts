import { NextResponse } from "next/server"
import { query } from "@/lib/db"

// GET - Obtener favoritos del usuario
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID requerido" }, { status: 400 })
    }

    const favorites = await query("SELECT * FROM favorites WHERE user_id = ? ORDER BY created_at DESC", [userId])

    return NextResponse.json({ favorites })
  } catch (error) {
    console.error("Error al obtener favoritos:", error)
    return NextResponse.json({ error: "Error al obtener favoritos" }, { status: 500 })
  }
}

// POST - Agregar a favoritos
export async function POST(request: Request) {
  try {
    const { userId, productName, productImage } = await request.json()

    if (!userId || !productName) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    await query(
      "INSERT INTO favorites (user_id, product_name, product_image) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE product_image = VALUES(product_image)",
      [userId, productName, productImage],
    )

    return NextResponse.json({ message: "Agregado a favoritos" })
  } catch (error) {
    console.error("Error al agregar a favoritos:", error)
    return NextResponse.json({ error: "Error al agregar a favoritos" }, { status: 500 })
  }
}

// DELETE - Eliminar de favoritos
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const productName = searchParams.get("productName")

    if (!userId || !productName) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    await query("DELETE FROM favorites WHERE user_id = ? AND product_name = ?", [userId, productName])

    return NextResponse.json({ message: "Eliminado de favoritos" })
  } catch (error) {
    console.error("Error al eliminar de favoritos:", error)
    return NextResponse.json({ error: "Error al eliminar de favoritos" }, { status: 500 })
  }
}
