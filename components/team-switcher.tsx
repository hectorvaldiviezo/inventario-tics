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
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

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
                  <AvatarImage src={"placeholder.svg"} alt={"placeholder"} />
                  <AvatarFallback className="bg-transparent">
                    {"A"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-semibold">{"Hector"}</span>
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
              Estudiantes
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
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
