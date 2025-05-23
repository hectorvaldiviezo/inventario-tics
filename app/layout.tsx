import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Inventario - Sistema de Gestión",
  description: "Sistema de inventario de equipo informático",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-background min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-4 md:py-6">{children}</main>
            <footer className="py-4 text-center text-sm text-muted-foreground bg-primary text-white">
              <div className="container mx-auto">Sistema de Inventario © {new Date().getFullYear()}</div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
