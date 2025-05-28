
import { useState } from "react";
import {
  Calendar,
  Users,
  User,
  DollarSign,
  Scissors,
  BarChart3,
  Settings,
  Home,
  Package,
  Bell
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Agendamentos", url: "/agendamentos", icon: Calendar },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Profissionais", url: "/profissionais", icon: User },
  { title: "Serviços", url: "/servicos", icon: Scissors },
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "Estoque", url: "/estoque", icon: Package },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Notificações", url: "/notificacoes", icon: Bell },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-200 ${
      isActive 
        ? "bg-barbershop-gold text-barbershop-black font-semibold shadow-lg" 
        : "text-barbershop-gray-100 hover:bg-barbershop-gray-800 hover:text-barbershop-gold"
    }`;

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} bg-barbershop-black border-r border-barbershop-gray-800 transition-all duration-300`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-barbershop-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
            <Scissors className="w-5 h-5 text-barbershop-black" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-barbershop-gold font-bold text-lg">BarberPro</h2>
              <p className="text-barbershop-gray-400 text-xs">Gestão Completa</p>
            </div>
          )}
        </div>
      </div>

      <SidebarTrigger className="absolute -right-4 top-6 bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark rounded-full p-2 shadow-lg z-50" />

      <SidebarContent className="bg-barbershop-black">
        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="text-barbershop-gray-400 font-medium px-4 py-2">
            {!collapsed && "Menu Principal"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 flex-shrink-0`} />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
