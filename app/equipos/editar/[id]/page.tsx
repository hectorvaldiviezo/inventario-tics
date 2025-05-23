"use client";

import type React from "react";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectInput } from "@/components/adaptive-inputs/select-input";
import { DateInput } from "@/components/adaptive-inputs/date-input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInventoryStore } from "@/store/inventory-store";
import { toast } from "@/hooks/use-toast";

export default function EditarEquipoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getEquipo, updateEquipo } = useInventoryStore();

  const [formData, setFormData] = useState({
    nombre: "",
    serial: "",
    categoria: "",
    estado: "Activo" as "Activo" | "Mantenimiento" | "Obsoleto",
    ubicacion: "",
    fechaAdquisicion: undefined as Date | undefined,
    valor: "",
    responsable: "",
    descripcion: "",
    notas: "",
  });

  useEffect(() => {
    const equipo = getEquipo(id);
    if (equipo) {
      setFormData({
        nombre: equipo.nombre,
        serial: equipo.serial || "",
        categoria: equipo.categoria,
        estado: equipo.estado,
        ubicacion: equipo.ubicacion,
        fechaAdquisicion: equipo.fechaAdquisicion
          ? new Date(equipo.fechaAdquisicion)
          : undefined,
        valor: equipo.valor ? String(equipo.valor) : "",
        responsable: equipo.responsable || "",
        descripcion: equipo.descripcion || "",
        notas: equipo.notas || "",
      });
    } else {
      toast({
        title: "Error",
        description: "Equipo no encontrado",
        variant: "destructive",
      });
      router.push("/equipos");
    }
  }, [id, getEquipo, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, fechaAdquisicion: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre || !formData.categoria || !formData.ubicacion) {
      toast({
        title: "Error",
        description: "Por favor completa los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Actualizar equipo
    updateEquipo(id, {
      nombre: formData.nombre,
      serial: formData.serial,
      categoria: formData.categoria,
      estado: formData.estado,
      ubicacion: formData.ubicacion,
      fechaAdquisicion: formData.fechaAdquisicion?.toISOString().split("T")[0],
      valor: formData.valor ? Number.parseFloat(formData.valor) : undefined,
      responsable: formData.responsable,
      descripcion: formData.descripcion,
      notas: formData.notas,
    });

    toast({
      title: "Éxito",
      description: "Equipo actualizado correctamente",
    });

    router.push("/equipos");
  };

  const categoryOptions = [
    { value: "Computadoras", label: "Computadoras" },
    { value: "Impresoras", label: "Impresoras" },
    { value: "Servidores", label: "Servidores" },
    { value: "Redes", label: "Equipos de Red" },
    { value: "Periféricos", label: "Periféricos" },
    { value: "Otros", label: "Otros" },
  ];

  const statusOptions = [
    { value: "Activo", label: "Activo" },
    { value: "Mantenimiento", label: "En Mantenimiento" },
    { value: "Obsoleto", label: "Obsoleto" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/equipos">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Volver</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Editar Equipo
          </h1>
          <p className="text-muted-foreground">
            Actualiza la información del equipo
          </p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información del Equipo</CardTitle>
            <CardDescription>
              Modifica los detalles del equipo seleccionado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Equipo *</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Laptop Dell XPS 13"
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serial">Número de Serie</Label>
                <Input
                  id="serial"
                  name="serial"
                  value={formData.serial}
                  onChange={handleChange}
                  placeholder="Ej: XPS13-9380-123456"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <SelectInput
                  id="categoria"
                  name="categoria"
                  options={categoryOptions}
                  value={formData.categoria}
                  onChange={handleSelectChange("categoria")}
                  placeholder="Selecciona una categoría"
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <SelectInput
                  id="estado"
                  name="estado"
                  options={statusOptions}
                  value={formData.estado}
                  onChange={handleSelectChange("estado")}
                  placeholder="Selecciona un estado"
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ubicacion">Ubicación *</Label>
                <Input
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  placeholder="Ej: Oficina Principal"
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha-adquisicion">Fecha de Adquisición</Label>
                <DateInput
                  id="fecha-adquisicion"
                  name="fechaAdquisicion"
                  value={formData.fechaAdquisicion}
                  onChange={handleDateChange}
                  placeholder="Seleccionar fecha"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor ($)</Label>
                <Input
                  id="valor"
                  name="valor"
                  value={formData.valor}
                  onChange={handleChange}
                  type="number"
                  placeholder="0.00"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsable">Responsable</Label>
                <Input
                  id="responsable"
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleChange}
                  placeholder="Nombre del responsable"
                  className="bg-background"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ingresa una descripción detallada del equipo..."
                className="min-h-[100px] bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notas">Notas Adicionales</Label>
              <Textarea
                id="notas"
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                placeholder="Información adicional relevante..."
                className="min-h-[100px] bg-background"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/equipos">
              <Button variant="outline" className="bg-background">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Guardar Cambios
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
