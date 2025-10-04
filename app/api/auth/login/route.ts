import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validar datos
    if (!email || !password) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    const users = await query("SELECT id, name, email, password, role FROM users WHERE email = ?", [email])

    if (users.length === 0) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    const user = users[0]

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    return NextResponse.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    })
  } catch (error) {
    console.error("Error en login:", error)
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 })
  }
}
