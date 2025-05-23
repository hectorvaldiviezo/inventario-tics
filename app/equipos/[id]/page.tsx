"use client";

import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInventoryStore, type Equipment } from "@/store/inventory-store";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DetalleEquipoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getEquipo, deleteEquipo } = useInventoryStore();
  const [equipo, setEquipo] = useState<Equipment | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const equipoData = getEquipo(id);
    if (equipoData) {
      setEquipo(equipoData);
    } else {
      toast({
        title: "Error",
        description: "Equipo no encontrado",
        variant: "destructive",
      });
      router.push("/equipos");
    }
  }, [id, getEquipo, router]);

  const handleDelete = () => {
    if (equipo) {
      deleteEquipo(equipo.id);
      toast({
        title: "Éxito",
        description: "Equipo eliminado correctamente",
      });
      router.push("/equipos");
    }
  };

  if (!equipo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/equipos">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Volver</span>
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {equipo.nombre}
          </h1>
          <p className="text-muted-foreground">ID: {equipo.id}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/equipos/editar/${equipo.id}`}>
            <Button variant="outline" className="bg-background">
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </Button>
          </Link>
          <Button
            variant="outline"
            className="bg-background text-secondary hover:text-secondary"
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Categoría
                </p>
                <p>{equipo.categoria}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Estado
                </p>
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
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Ubicación
                </p>
                <p>{equipo.ubicacion}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Número de Serie
                </p>
                <p>{equipo.serial || "No especificado"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Fecha de Adquisición
                </p>
                <p>{equipo.fechaAdquisicion || "No especificada"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Valor
                </p>
                <p>
                  {equipo.valor
                    ? `$${equipo.valor.toFixed(2)}`
                    : "No especificado"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Responsable
                </p>
                <p>{equipo.responsable || "No especificado"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalles Adicionales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Descripción
              </p>
              <p className="mt-1">{equipo.descripcion || "Sin descripción"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Notas</p>
              <p className="mt-1">{equipo.notas || "Sin notas adicionales"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el equipo del inventario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-secondary hover:bg-secondary/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
