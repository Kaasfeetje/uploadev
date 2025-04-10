"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Inbox, Settings, Database } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const items = (id: string) => [
  {
    title: "Overview",
    url: `/dashboard/projects/${id}`,
    icon: Home,
  },
  {
    title: "Usage",
    url: `/dashboard/projects/${id}/usage`,
    icon: Inbox,
  },
  {
    title: "Data",
    url: `/dashboard/projects/${id}/data`,
    icon: Database,
  },
  {
    title: "Settings",
    url: `/dashboard/projects/${id}/settings`,
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Sidebar>
      <SidebarContent className="flex h-full max-h-screen flex-col justify-center">
        <SidebarGroup>
          <SidebarGroupLabel>Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items(id).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
