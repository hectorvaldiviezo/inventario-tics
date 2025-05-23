import * as React from "react";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    number?: string;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();
  const [itemActive, setItemActive] = React.useState<string>("");

  React.useEffect(() => {
    const path = "/" + pathname.split("/")[1];
    if (path === "/") {
      setItemActive("/home");
      return;
    }
    setItemActive(path);
  }, [pathname]);

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.url === itemActive}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                  <div className="w-full flex justify-end p-2">
                    <Badge className="w-fit grid place-items-center px-2">
                      {item.number}
                    </Badge>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
