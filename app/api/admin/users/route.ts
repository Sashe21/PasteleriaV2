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

    // Obtener todos los usuarios
    const users = await query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC")

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 })
  }
}
