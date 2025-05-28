
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AgendamentoForm } from "@/components/AgendamentoForm";

const Agendamentos = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-barbershop-gold">Agendamentos</h1>
              <p className="text-barbershop-gray-300 text-sm">Agende seu horário</p>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-4xl mx-auto">
              <AgendamentoForm />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Agendamentos;
