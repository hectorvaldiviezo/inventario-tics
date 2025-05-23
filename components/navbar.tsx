"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Package, BarChart3, Settings, Users, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-primary/90">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-primary text-white">
              <nav className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <Package className="h-5 w-5" />
                  <span>Inventario</span>
                </Link>
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Package className="h-6 w-6" />
            <span className="hidden md:inline-block">Inventario</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn("flex items-center gap-1 font-medium transition-colors hover:text-white/80")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-40 lg:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-8 bg-primary/20 border-primary/20 text-white placeholder:text-white/70 w-full"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary/90">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Configuración</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary/90">
            <Users className="h-5 w-5" />
            <span className="sr-only">Usuarios</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: "Equipos",
    href: "/equipos",
    icon: <Package className="h-5 w-5" />,
  },
  {
    label: "Reportes",
    href: "/reportes",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    label: "Configuración",
    href: "/configuracion",
    icon: <Settings className="h-5 w-5" />,
  },
]
