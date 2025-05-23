"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SelectInput } from "@/components/adaptive-inputs/select-input"
import { Switch } from "@/components/ui/switch"
import { Settings, Users, Database, Bell, Shield } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function ConfiguracionPage() {
  const [generalSettings, setGeneralSettings] = useState({
    nombreEmpresa: "Mi Empresa",
    direccion: "Calle Principal #123",
    telefono: "+1 234 567 8900",
    email: "contacto@miempresa.com",
    moneda: "USD",
  })

  const [notificaciones, setNotificaciones] = useState({
    emailAlerts: true,
    lowStock: true,
    maintenanceReminders: true,
    systemUpdates: false,
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string) => (checked: boolean) => {
    setNotificaciones((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSaveGeneral = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración general ha sido actualizada",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notificaciones actualizadas",
      description: "La configuración de notificaciones ha sido actualizada",
    })
  }

  const currencyOptions = [
    { value: "USD", label: "Dólar estadounidense (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "MXN", label: "Peso mexicano (MXN)" },
    { value: "COP", label: "Peso colombiano (COP)" },
    { value: "ARS", label: "Peso argentino (ARS)" },
    { value: "CLP", label: "Peso chileno (CLP)" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Configuración</h1>
        <p className="text-muted-foreground">Administra las configuraciones del sistema</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-background border">
          <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Users className="h-4 w-4 mr-2" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Bell className="h-4 w-4 mr-2" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura la información básica de tu empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreEmpresa">Nombre de la Empresa</Label>
                  <Input
                    id="nombreEmpresa"
                    name="nombreEmpresa"
                    value={generalSettings.nombreEmpresa}
                    onChange={handleGeneralChange}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    value={generalSettings.direccion}
                    onChange={handleGeneralChange}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    value={generalSettings.telefono}
                    onChange={handleGeneralChange}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={generalSettings.email}
                    onChange={handleGeneralChange}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moneda">Moneda</Label>
                  <SelectInput
                    id="moneda"
                    options={currencyOptions}
                    value={generalSettings.moneda}
                    onChange={(value) => setGeneralSettings((prev) => ({ ...prev, moneda: value }))}
                    className="bg-background"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral} className="bg-primary hover:bg-primary/90">
                Guardar Cambios
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Inventario</CardTitle>
              <CardDescription>Personaliza las opciones de inventario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prefijo-id">Prefijo de ID</Label>
                  <Input id="prefijo-id" defaultValue="INV-" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alerta-stock">Nivel de Alerta de Stock</Label>
                  <Input id="alerta-stock" type="number" defaultValue="5" className="bg-background" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary hover:bg-primary/90">Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Administra los usuarios del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Usuario</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Rol</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-sm">Admin</td>
                      <td className="px-4 py-3 text-sm">admin@ejemplo.com</td>
                      <td className="px-4 py-3 text-sm">Administrador</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">Usuario1</td>
                      <td className="px-4 py-3 text-sm">usuario1@ejemplo.com</td>
                      <td className="px-4 py-3 text-sm">Editor</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">Usuario2</td>
                      <td className="px-4 py-3 text-sm">usuario2@ejemplo.com</td>
                      <td className="px-4 py-3 text-sm">Visualizador</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <Button className="bg-primary hover:bg-primary/90">
                  <Users className="mr-2 h-4 w-4" /> Agregar Usuario
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Personaliza las notificaciones del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-alerts">Alertas por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones importantes por correo electrónico
                  </p>
                </div>
                <Switch
                  id="email-alerts"
                  checked={notificaciones.emailAlerts}
                  onCheckedChange={handleNotificationChange("emailAlerts")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="low-stock">Alertas de Stock Bajo</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando el stock esté por debajo del nivel mínimo
                  </p>
                </div>
                <Switch
                  id="low-stock"
                  checked={notificaciones.lowStock}
                  onCheckedChange={handleNotificationChange("lowStock")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-reminders">Recordatorios de Mantenimiento</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe recordatorios para el mantenimiento programado de equipos
                  </p>
                </div>
                <Switch
                  id="maintenance-reminders"
                  checked={notificaciones.maintenanceReminders}
                  onCheckedChange={handleNotificationChange("maintenanceReminders")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-updates">Actualizaciones del Sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones sobre actualizaciones del sistema
                  </p>
                </div>
                <Switch
                  id="system-updates"
                  checked={notificaciones.systemUpdates}
                  onCheckedChange={handleNotificationChange("systemUpdates")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications} className="bg-primary hover:bg-primary/90">
                Guardar Cambios
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>Administra la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input id="confirm-password" type="password" className="bg-background" />
              </div>
              <div className="pt-4">
                <Button className="bg-primary hover:bg-primary/90">Cambiar Contraseña</Button>
              </div>

              <div className="border-t pt-4 mt-6">
                <h3 className="text-lg font-medium mb-2">Autenticación de Dos Factores</h3>
                <p className="text-sm text-muted-foreground mb-4">Añade una capa adicional de seguridad a tu cuenta</p>
                <Button variant="outline" className="bg-background">
                  Configurar Autenticación de Dos Factores
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Copias de Seguridad</CardTitle>
              <CardDescription>Gestiona las copias de seguridad de tus datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Copia de Seguridad Automática</h3>
                  <p className="text-sm text-muted-foreground">Realiza copias de seguridad automáticas de tus datos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Frecuencia</Label>
                <SelectInput
                  options={[
                    { value: "diaria", label: "Diaria" },
                    { value: "semanal", label: "Semanal" },
                    { value: "mensual", label: "Mensual" },
                  ]}
                  value="semanal"
                  onChange={() => {}}
                  className="bg-background"
                />
              </div>
              <div className="pt-4 flex gap-4">
                <Button className="bg-primary hover:bg-primary/90">
                  <Database className="mr-2 h-4 w-4" /> Crear Copia de Seguridad
                </Button>
                <Button variant="outline" className="bg-background">
                  Restaurar Copia
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
