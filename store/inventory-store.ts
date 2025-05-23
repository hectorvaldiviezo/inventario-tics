"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Equipment {
  id: string
  nombre: string
  serial?: string
  categoria: string
  estado: "Activo" | "Mantenimiento" | "Obsoleto"
  ubicacion: string
  fechaAdquisicion?: string
  valor?: number
  responsable?: string
  descripcion?: string
  notas?: string
}

interface InventoryState {
  equipos: Equipment[]
  addEquipo: (equipo: Omit<Equipment, "id">) => void
  updateEquipo: (id: string, equipo: Partial<Equipment>) => void
  deleteEquipo: (id: string) => void
  getEquipo: (id: string) => Equipment | undefined
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      equipos: [
        {
          id: "INV-001",
          nombre: "Laptop Dell XPS 13",
          serial: "XPS13-9380-123456",
          categoria: "Computadoras",
          ubicacion: "Oficina Principal",
          estado: "Activo",
          fechaAdquisicion: "2023-01-15",
          valor: 1299.99,
          responsable: "Juan Pérez",
          descripcion: "Laptop de alta gama para desarrollo de software",
          notas: "Asignada al departamento de desarrollo",
        },
        {
          id: "INV-002",
          nombre: "Impresora HP LaserJet",
          serial: "HPLJ-2022-789012",
          categoria: "Impresoras",
          ubicacion: "Departamento de Ventas",
          estado: "Mantenimiento",
          fechaAdquisicion: "2022-11-05",
          valor: 349.99,
          responsable: "María Rodríguez",
          descripcion: "Impresora láser a color para documentos de oficina",
          notas: "Requiere cambio de tóner",
        },
        {
          id: "INV-003",
          nombre: "Router Cisco",
          serial: "CISCO-RT-456789",
          categoria: "Redes",
          ubicacion: "Sala de Servidores",
          estado: "Activo",
          fechaAdquisicion: "2023-03-20",
          valor: 199.99,
          responsable: "Carlos Gómez",
          descripcion: "Router para conexión de red interna",
          notas: "",
        },
        {
          id: "INV-004",
          nombre: 'Monitor LG 27"',
          serial: "LG27-UHD-345678",
          categoria: "Periféricos",
          ubicacion: "Oficina Principal",
          estado: "Activo",
          fechaAdquisicion: "2023-02-10",
          valor: 249.99,
          responsable: "Ana Martínez",
          descripcion: "Monitor UHD para diseño gráfico",
          notas: "",
        },
        {
          id: "INV-005",
          nombre: "Servidor Dell PowerEdge",
          serial: "DELL-PE-567890",
          categoria: "Servidores",
          ubicacion: "Sala de Servidores",
          estado: "Obsoleto",
          fechaAdquisicion: "2018-05-15",
          valor: 2499.99,
          responsable: "Luis Sánchez",
          descripcion: "Servidor para alojamiento de aplicaciones internas",
          notas: "Programado para reemplazo",
        },
      ],
      addEquipo: (equipo) => {
        const id = `INV-${String(get().equipos.length + 1).padStart(3, "0")}`
        set((state) => ({
          equipos: [...state.equipos, { ...equipo, id }],
        }))
      },
      updateEquipo: (id, updatedEquipo) => {
        set((state) => ({
          equipos: state.equipos.map((equipo) => (equipo.id === id ? { ...equipo, ...updatedEquipo } : equipo)),
        }))
      },
      deleteEquipo: (id) => {
        set((state) => ({
          equipos: state.equipos.filter((equipo) => equipo.id !== id),
        }))
      },
      getEquipo: (id) => {
        return get().equipos.find((equipo) => equipo.id === id)
      },
    }),
    {
      name: "inventory-storage",
    },
  ),
)
