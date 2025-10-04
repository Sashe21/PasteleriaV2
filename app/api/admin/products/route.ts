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

    const products = await query("SELECT * FROM products ORDER BY created_at DESC")

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId, name, description, price, image, category } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }

    // Verificar que el usuario sea admin
    const userResult = await query("SELECT role FROM users WHERE id = ?", [userId])
    if (!userResult || userResult.length === 0 || userResult[0].role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const result = await query(
      "INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, image, category],
    )

    return NextResponse.json({ success: true, productId: result.insertId })
  } catch (error) {
    console.error("Error al crear producto:", error)
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, productId, name, description, price, image, category } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }

    // Verificar que el usuario sea admin
    const userResult = await query("SELECT role FROM users WHERE id = ?", [userId])
    if (!userResult || userResult.length === 0 || userResult[0].role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    await query("UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ? WHERE id = ?", [
      name,
      description,
      price,
      image,
      category,
      productId,
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const productId = searchParams.get("productId")

    if (!userId) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }

    // Verificar que el usuario sea admin
    const userResult = await query("SELECT role FROM users WHERE id = ?", [userId])
    if (!userResult || userResult.length === 0 || userResult[0].role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    await query("DELETE FROM products WHERE id = ?", [productId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 })
  }
}
