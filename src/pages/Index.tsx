
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { StatCard } from "@/components/StatCard";
import { QuickActions } from "@/components/QuickActions";
import { RecentAppointments } from "@/components/RecentAppointments";
import { RevenueChart } from "@/components/RevenueChart";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Scissors,
  Clock
} from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-barbershop-gold hover:text-barbershop-gold-light" />
              <div>
                <h1 className="text-2xl font-bold text-barbershop-gold">Dashboard</h1>
                <p className="text-barbershop-gray-300 text-sm">Visão geral do seu negócio</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-barbershop-gold font-medium">Barbearia Premium</p>
                <p className="text-barbershop-gray-300 text-sm">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-6 bg-barbershop-gray-900">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Agendamentos Hoje"
                value={12}
                icon={Calendar}
                trend={{ value: 15, isPositive: true }}
                description="4 concluídos, 8 pendentes"
              />
              <StatCard
                title="Clientes Ativos"
                value={247}
                icon={Users}
                trend={{ value: 8, isPositive: true }}
                description="Último mês"
              />
              <StatCard
                title="Receita do Mês"
                value="R$ 8.200"
                icon={DollarSign}
                trend={{ value: 12, isPositive: true }}
                description="Meta: R$ 10.000"
              />
              <StatCard
                title="Serviços Realizados"
                value={89}
                icon={Scissors}
                trend={{ value: 5, isPositive: true }}
                description="Este mês"
              />
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <QuickActions />
              </div>

              {/* Recent Appointments */}
              <div className="lg:col-span-2">
                <RecentAppointments />
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="grid grid-cols-1">
              <RevenueChart />
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Tempo Médio de Atendimento"
                value="45 min"
                icon={Clock}
                description="Redução de 5 min"
              />
              <StatCard
                title="Taxa de Ocupação"
                value="87%"
                icon={TrendingUp}
                trend={{ value: 3, isPositive: true }}
                description="Horários utilizados"
              />
              <StatCard
                title="Novos Clientes"
                value={23}
                icon={Users}
                trend={{ value: 18, isPositive: true }}
                description="Este mês"
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
