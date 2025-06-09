import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Agendamentos from "./pages/Agendamentos";
import Cliente from "./pages/Cliente";
import Barbeiro from "./pages/Barbeiro";
import Clientes from "./pages/Clientes";
import Profissionais from "./pages/Profissionais";
import Servicos from "./pages/Servicos";
import Estoque from "./pages/Estoque";
import Financeiro from "./pages/Financeiro";
import Relatorios from "./pages/Relatorios";
import Notificacoes from "./pages/Notificacoes";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";
import ControleAgendamentos from "./pages/ControleAgendamentos";
import Promocoes from "./pages/Promocoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/controle-agendamentos" element={<ControleAgendamentos />} />
          <Route path="/promocoes" element={<Promocoes />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/barbeiro" element={<Barbeiro />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/profissionais" element={<Profissionais />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
