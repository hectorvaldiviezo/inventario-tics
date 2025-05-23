"use client";
import * as React from "react";
import {
  AudioWaveform,
  Command,
  Apple,
  GalleryVerticalEnd,
  Home,
  Sandwich,
  ShoppingCart,
  PiggyBank,
  List,
  FileStack,
} from "lucide-react";

import { NavItems } from "@/components/nav-projects";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavSecondary } from "./nav-secondary";
// import { useCarritoStore } from "@/pages/carrito/lib/CarritoStore";
// import { useAuthStore } from "@/pages/auth/lib/auth.store";
// import { PoliticaDevolucionModal } from "./PoliticaDevolucionModal";
// import { TerminosCondicionesModal } from "./TerminosCondicionesModal";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navSecondary: [
    {
      title: "Saldo",
      url: "/saldo",
      icon: PiggyBank,
      number: "0",
    },
    {
      title: "Carrito",
      url: "/carrito",
      icon: ShoppingCart,
      number: "0",
    },
  ],
  items: [
    {
      name: "Inicio",
      url: "/inicio",
      icon: Home,
    },
    {
      name: "Almuerzos",
      url: "/almuerzos",
      icon: Sandwich,
    },
    {
      name: "Historial de Almuerzos",
      url: "/historial-almuerzos",
      icon: GalleryVerticalEnd,
    },
    {
      name: "Productos",
      url: "/productos",
      icon: Apple,
    },
    {
      name: "Historial Saldo",
      url: "/historial-saldo",
      icon: List,
    },
    {
      name: "Historial Productos",
      url: "/historial-productos",
      icon: FileStack,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { items: cantidad } = useCarritoStore();
  // const { estudianteSelected } = useAuthStore();
  // data.navSecondary[0].number = "S/ " + (estudianteSelected?.saldo ?? "0.00");
  // data.navSecondary[1].number = cantidad.length.toString();

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <img className="object-cover" src="/logo.png" alt="SM" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">
                    IEP "Santo Toribio de Mogrovejo"
                  </span>
                  <span className="">Comedor</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavItems items={data.items} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
