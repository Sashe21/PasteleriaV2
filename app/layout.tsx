import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { AppProvider } from "@/context/AppContext"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Pastelería Ines - Pasteles Artesanales",
  description: "Pasteles artesanales y postres hechos con amor",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AppProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Toaster />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  )
}
