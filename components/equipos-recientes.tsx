"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useInventoryStore } from "@/store/inventory-store"

export default function EquiposRecientes() {
  const { equipos } = useInventoryStore()

  // Obtener los 5 equipos más recientes (en un caso real, ordenarías por fecha)
  const equiposRecientes = equipos.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipos Recientes</CardTitle>
        <CardDescription>Últimos equipos agregados al inventario</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {equiposRecientes.map((equipo) => (
            <div key={equipo.id} className="flex items-center">
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">{equipo.nombre}</p>
                <div className="flex items-center pt-2">
                  <Badge
                    className={
                      equipo.estado === "Activo"
                        ? "bg-green-500 mr-2"
                        : equipo.estado === "Mantenimiento"
                          ? "bg-secondary mr-2"
                          : "bg-gray-500 mr-2"
                    }
                  >
                    {equipo.estado}
                  </Badge>
                  <span className="text-xs text-muted-foreground">ID: {equipo.id}</span>
                </div>
              </div>
              <Link href={`/equipos/${equipo.id}`}>
                <Button variant="ghost" size="sm">
                  Ver
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
