"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Empresa {
  id: number;
  abreviatura: string;
  nombre: string;
  logo: string;
}
const empresas: Empresa[] = [
  {
    id: 1,
    abreviatura: "TP",
    nombre: "Transportes Pakatnamu",
    logo: "/placeholder1.svg",
  },
  {
    id: 2,
    abreviatura: "DP",
    nombre: "Deposito Pakatnamu",
    logo: "/placeholder1.svg",
  },
  {
    id: 3,
    abreviatura: "AP",
    nombre: "Automotores Pakatnamu",
    logo: "/placeholder1.svg",
  },
  {
    id: 4,
    abreviatura: "GP",
    nombre: "Grupo Pakatnamu",
    logo: "/placeholder1.svg",
  },
];

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  const [empresa, setEmpresa] = useState(empresas[0]);

  const handleSelectedEmpresa = (empresa: Empresa) => {
    setEmpresa(empresa);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar>
                  <AvatarImage src={empresa.logo} alt={empresa.nombre} />
                  <AvatarFallback className="bg-transparent">
                    {empresa.abreviatura}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-semibold">{empresa.nombre}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Empresas
            </DropdownMenuLabel>
            {/* {estudiantes.length === 0 && (
              <DropdownMenuItem className="gap-2 p-2 text-xs">
                No hay estudiantes
              </DropdownMenuItem>
            )} */}
            {/* {estudiantes.map((estudiante) => (
              <DropdownMenuItem
                key={estudiante.id}
                onClick={() => handleSelectEstudiante(estudiante)}
                className="gap-2 p-2 text-xs"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Avatar>
                    <AvatarImage
                      src={estudiante?.nombre_completo}
                      alt={estudiante?.nombre_completo}
                    />
                    <AvatarFallback className="bg-transparent">
                      {estudiante?.nombre_completo.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {estudiante.nombre_completo}
              </DropdownMenuItem>
            ))} */}
            {empresas.length === 0 && (
              <DropdownMenuItem className="gap-2 p-2 text-xs">
                No hay estudiantes
              </DropdownMenuItem>
            )}
            {empresas.map((empresa) => (
              <DropdownMenuItem
                key={empresa.id}
                onClick={() => handleSelectedEmpresa(empresa)}
                className="gap-4 p-2 text-xs"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Avatar>
                    <AvatarImage
                      className="p-2"
                      src={empresa?.logo}
                      alt={empresa?.logo}
                    />
                    <AvatarFallback className="bg-transparent">
                      {empresa?.abreviatura}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {empresa.nombre}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
