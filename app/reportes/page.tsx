"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SelectInput } from "@/components/adaptive-inputs/select-input"
import { DateInput } from "@/components/adaptive-inputs/date-input"
import { Label } from "@/components/ui/label"
import { BarChart, Download, FileText } from "lucide-react"
import { useInventoryStore } from "@/store/inventory-store"
import { useState } from "react"

export default function ReportesPage() {
  const { equipos } = useInventoryStore()
  const [reportType, setReportType] = useState("categoria")
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({})

  // Calcular estadísticas
  const totalEquipos = equipos.length
  const equiposActivos = equipos.filter((e) => e.estado === "Activo").length
  const equiposMantenimiento = equipos.filter((e) => e.estado === "Mantenimiento").length
  const equiposObsoletos = equipos.filter((e) => e.estado === "Obsoleto").length

  // Agrupar por categoría
  const categorias = equipos.reduce(
    (acc, equipo) => {
      acc[equipo.categoria] = (acc[equipo.categoria] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const reportTypeOptions = [
    { value: "categoria", label: "Por Categoría" },
    { value: "estado", label: "Por Estado" },
    { value: "ubicacion", label: "Por Ubicación" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Reportes</h1>
        <p className="text-muted-foreground">Visualiza y genera reportes de tu inventario</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Equipos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEquipos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Equipos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equiposActivos}</div>
            <p className="text-xs text-muted-foreground">
              {((equiposActivos / totalEquipos) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En Mantenimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equiposMantenimiento}</div>
            <p className="text-xs text-muted-foreground">
              {((equiposMantenimiento / totalEquipos) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Obsoletos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equiposObsoletos}</div>
            <p className="text-xs text-muted-foreground">
              {((equiposObsoletos / totalEquipos) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="graficos" className="space-y-4">
        <TabsList className="bg-background border">
          <TabsTrigger value="graficos" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <BarChart className="h-4 w-4 mr-2" />
            Gráficos
          </TabsTrigger>
          <TabsTrigger value="exportar" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <FileText className="h-4 w-4 mr-2" />
            Exportar Reportes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="graficos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Equipos</CardTitle>
              <CardDescription>Visualización de la distribución de equipos según diferentes criterios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="w-full md:w-64">
                  <Label htmlFor="report-type" className="mb-2 block">
                    Tipo de Reporte
                  </Label>
                  <SelectInput
                    id="report-type"
                    options={reportTypeOptions}
                    value={reportType}
                    onChange={setReportType}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  {reportType === "categoria" && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Distribución por Categoría</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(categorias).map(([categoria, cantidad]) => (
                          <Card key={categoria} className="p-4">
                            <p className="font-medium">{categoria}</p>
                            <p className="text-2xl font-bold">{cantidad}</p>
                            <p className="text-xs text-muted-foreground">
                              {((cantidad / totalEquipos) * 100).toFixed(1)}% del total
                            </p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  {reportType === "estado" && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Distribución por Estado</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <Card className="p-4">
                          <p className="font-medium">Activo</p>
                          <p className="text-2xl font-bold">{equiposActivos}</p>
                          <p className="text-xs text-muted-foreground">
                            {((equiposActivos / totalEquipos) * 100).toFixed(1)}% del total
                          </p>
                        </Card>
                        <Card className="p-4">
                          <p className="font-medium">En Mantenimiento</p>
                          <p className="text-2xl font-bold">{equiposMantenimiento}</p>
                          <p className="text-xs text-muted-foreground">
                            {((equiposMantenimiento / totalEquipos) * 100).toFixed(1)}% del total
                          </p>
                        </Card>
                        <Card className="p-4">
                          <p className="font-medium">Obsoleto</p>
                          <p className="text-2xl font-bold">{equiposObsoletos}</p>
                          <p className="text-xs text-muted-foreground">
                            {((equiposObsoletos / totalEquipos) * 100).toFixed(1)}% del total
                          </p>
                        </Card>
                      </div>
                    </div>
                  )}
                  {reportType === "ubicacion" && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Distribución por Ubicación</h3>
                      <p>Gráfico de distribución por ubicación</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exportar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exportar Reportes</CardTitle>
              <CardDescription>Genera y descarga reportes en diferentes formatos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Fecha Inicial</Label>
                    <DateInput
                      value={dateRange.start}
                      onChange={(date) => setDateRange((prev) => ({ ...prev, start: date }))}
                      placeholder="Seleccionar fecha inicial"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha Final</Label>
                    <DateInput
                      value={dateRange.end}
                      onChange={(date) => setDateRange((prev) => ({ ...prev, end: date }))}
                      placeholder="Seleccionar fecha final"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Reporte</Label>
                  <SelectInput
                    options={[
                      { value: "inventario-completo", label: "Inventario Completo" },
                      { value: "equipos-activos", label: "Equipos Activos" },
                      { value: "equipos-mantenimiento", label: "Equipos en Mantenimiento" },
                      { value: "equipos-obsoletos", label: "Equipos Obsoletos" },
                      { value: "por-categoria", label: "Por Categoría" },
                      { value: "por-ubicacion", label: "Por Ubicación" },
                    ]}
                    value="inventario-completo"
                    onChange={() => {}}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Formato</Label>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="bg-background">
                      <FileText className="mr-2 h-4 w-4" /> PDF
                    </Button>
                    <Button variant="outline" className="bg-background">
                      <FileText className="mr-2 h-4 w-4" /> Excel
                    </Button>
                    <Button variant="outline" className="bg-background">
                      <FileText className="mr-2 h-4 w-4" /> CSV
                    </Button>
                  </div>
                </div>

                <Button className="w-full md:w-auto bg-primary hover:bg-primary/90">
                  <Download className="mr-2 h-4 w-4" /> Generar y Descargar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
