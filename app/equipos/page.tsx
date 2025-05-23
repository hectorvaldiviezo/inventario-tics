"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SelectInput } from "@/components/adaptive-inputs/select-input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useInventoryStore } from "@/store/inventory-store"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function EquiposPage() {
  const { equipos, deleteEquipo } = useInventoryStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [equipoToDelete, setEquipoToDelete] = useState<string | null>(null)

  // Filtrar equipos
  const filteredEquipos = equipos.filter((equipo) => {
    const matchesSearch =
      equipo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || equipo.estado.toLowerCase() === statusFilter.toLowerCase()
    const matchesCategory =
      categoryFilter === "todos" || equipo.categoria.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDelete = (id: string) => {
    deleteEquipo(id)
    setEquipoToDelete(null)
  }

  const statusOptions = [
    { value: "todos", label: "Todos los estados" },
    { value: "activo", label: "Activo" },
    { value: "mantenimiento", label: "En mantenimiento" },
    { value: "obsoleto", label: "Obsoleto" },
  ]

  const categoryOptions = [
    { value: "todos", label: "Todas las categorías" },
    { value: "computadoras", label: "Computadoras" },
    { value: "impresoras", label: "Impresoras" },
    { value: "servidores", label: "Servidores" },
    { value: "redes", label: "Equipos de Red" },
    { value: "perifericos", label: "Periféricos" },
    { value: "otros", label: "Otros" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Equipos</h1>
          <p className="text-muted-foreground">Gestiona tu inventario de equipos informáticos</p>
        </div>
        <Link href="/equipos/nuevo">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Agregar Equipo
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Equipos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar equipos..."
                className="pl-8 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <SelectInput
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Estado"
                className="w-full sm:w-[180px] bg-background"
              />
              <SelectInput
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
                placeholder="Categoría"
                className="w-full sm:w-[180px] bg-background"
              />
              <Button variant="outline" className="bg-background">
                <Filter className="mr-2 h-4 w-4" /> Filtros
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="hidden md:table-cell">Categoría</TableHead>
                  <TableHead className="hidden md:table-cell">Ubicación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipos.length > 0 ? (
                  filteredEquipos.map((equipo) => (
                    <TableRow key={equipo.id}>
                      <TableCell className="font-medium">{equipo.id}</TableCell>
                      <TableCell>{equipo.nombre}</TableCell>
                      <TableCell className="hidden md:table-cell">{equipo.categoria}</TableCell>
                      <TableCell className="hidden md:table-cell">{equipo.ubicacion}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            equipo.estado === "Activo"
                              ? "bg-green-500"
                              : equipo.estado === "Mantenimiento"
                                ? "bg-secondary"
                                : "bg-gray-500"
                          }
                        >
                          {equipo.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/equipos/${equipo.id}`}>
                            <Button variant="ghost" size="sm">
                              Ver
                            </Button>
                          </Link>
                          <Link href={`/equipos/editar/${equipo.id}`}>
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" onClick={() => setEquipoToDelete(equipo.id)}>
                            <Trash2 className="h-4 w-4 text-secondary" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No se encontraron equipos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm" className="bg-background">
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="bg-background">
              Siguiente
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!equipoToDelete} onOpenChange={(open) => !open && setEquipoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el equipo del inventario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => equipoToDelete && handleDelete(equipoToDelete)}
              className="bg-secondary hover:bg-secondary/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
