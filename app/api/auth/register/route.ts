import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validar datos
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await query("SELECT id FROM users WHERE email = ?", [email])

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 })
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insertar usuario
    const result = await query("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())", [
      name,
      email,
      hashedPassword,
    ])

    return NextResponse.json(
      {
        message: "Usuario registrado exitosamente",
        user: {
          id: result.insertId,
          name,
          email,
          role: "user",
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error en registro:", error)
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 })
  }
}
