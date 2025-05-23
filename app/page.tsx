"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart, LineChart } from "lucide-react";
import Link from "next/link";
import InventarioResumen from "@/components/inventario-resumen";
import EquiposRecientes from "@/components/equipos-recientes";
import { useInventoryStore } from "@/store/inventory-store";

export default function Home() {
  const { equipos } = useInventoryStore();

  // Calcular estadísticas
  const totalEquipos = equipos.length;
  const equiposActivos = equipos.filter((e) => e.estado === "Activo").length;
  const equiposMantenimiento = equipos.filter(
    (e) => e.estado === "Mantenimiento"
  ).length;
  const equiposObsoletos = equipos.filter(
    (e) => e.estado === "Obsoleto"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Bienvenido al sistema de inventario
          </p>
        </div>
        <Link href="/equipos/nuevo">
          <Button className="bg-primary hover:bg-primary/90">
            Agregar Equipo
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equipos</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-primary"
            >
              <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
              <line x1="2" x2="22" y1="20" y2="20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEquipos}</div>
            <p className="text-xs text-muted-foreground">Inventario total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Equipos Activos
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-primary"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equiposActivos}</div>
            <p className="text-xs text-muted-foreground">
              {((equiposActivos / totalEquipos) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              En Mantenimiento
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-secondary"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equiposMantenimiento}</div>
            <p className="text-xs text-muted-foreground">
              {((equiposMantenimiento / totalEquipos) * 100).toFixed(1)}% del
              total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obsoletos</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-secondary"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equiposObsoletos}</div>
            <p className="text-xs text-muted-foreground">
              {((equiposObsoletos / totalEquipos) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList className="bg-background border">
          <TabsTrigger
            value="resumen"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Resumen
          </TabsTrigger>
          <TabsTrigger
            value="recientes"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <LineChart className="h-4 w-4 mr-2" />
            Recientes
          </TabsTrigger>
          <TabsTrigger
            value="categorias"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <PieChart className="h-4 w-4 mr-2" />
            Categorías
          </TabsTrigger>
        </TabsList>
        <TabsContent value="resumen" className="space-y-4">
          <InventarioResumen />
        </TabsContent>
        <TabsContent value="recientes" className="space-y-4">
          <EquiposRecientes />
        </TabsContent>
        <TabsContent value="categorias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Categorías</CardTitle>
              <CardDescription>
                Distribución de equipos por categoría en el inventario
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Gráfico de distribución por categorías
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
