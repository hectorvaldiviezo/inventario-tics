"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useInventoryStore } from "@/store/inventory-store"

export default function InventarioResumen() {
  const { equipos } = useInventoryStore()

  // Datos de ejemplo para el gráfico
  const data = [
    { name: "Ene", total: 12 },
    { name: "Feb", total: 8 },
    { name: "Mar", total: 15 },
    { name: "Abr", total: 10 },
    { name: "May", total: 18 },
    { name: "Jun", total: 5 },
    { name: "Jul", total: 20 },
    { name: "Ago", total: 14 },
    { name: "Sep", total: 9 },
    { name: "Oct", total: 16 },
    { name: "Nov", total: 11 },
    { name: "Dic", total: 7 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adquisiciones Mensuales</CardTitle>
        <CardDescription>Número de equipos adquiridos por mes durante el último año</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: "Equipos",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar dataKey="total" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
