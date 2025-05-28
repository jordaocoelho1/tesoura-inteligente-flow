
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, User, Star, Gift, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const agendamentosCliente = [
  {
    id: "1",
    servico: "Corte + Barba",
    profissional: "João Silva",
    data: new Date(2025, 0, 30),
    horario: "14:00",
    status: "Confirmado",
    preco: "R$ 55,00"
  },
  {
    id: "2",
    servico: "Corte Masculino",
    profissional: "Pedro Santos",
    data: new Date(2025, 0, 15),
    horario: "10:30",
    status: "Concluído",
    preco: "R$ 35,00"
  },
  {
    id: "3",
    servico: "Barba",
    profissional: "João Silva",
    data: new Date(2024, 11, 20),
    horario: "16:00",
    status: "Concluído",
    preco: "R$ 25,00"
  }
];

const dadosCliente = {
  nome: "Carlos Oliveira",
  telefone: "(11) 99999-9999",
  email: "carlos@email.com",
  pontosAtivos: 85,
  proximaRecompensa: 100,
  totalCortes: 12,
  clienteDesde: new Date(2024, 5, 15)
};

const Cliente = () => {
  const [telefone, setTelefone] = useState("");
  const [clienteLogado, setClienteLogado] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (telefone) {
      setClienteLogado(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "bg-green-600";
      case "Concluído":
        return "bg-blue-600";
      case "Cancelado":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  if (!clienteLogado) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-barbershop-black">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
              <div>
                <h1 className="text-2xl font-bold text-barbershop-gold">Área do Cliente</h1>
                <p className="text-barbershop-gray-300 text-sm">Acesse sua conta</p>
              </div>
            </header>

            <main className="flex-1 p-6 bg-barbershop-gray-900 flex items-center justify-center">
              <Card className="w-full max-w-md bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold text-center">Login do Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="text-barbershop-gray-200">Telefone</Label>
                      <Input
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark"
                    >
                      Acessar Conta
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-barbershop-gold">Minha Conta</h1>
              <p className="text-barbershop-gray-300 text-sm">Olá, {dadosCliente.nome}</p>
            </div>
            <Button 
              onClick={() => setClienteLogado(false)}
              variant="outline"
              className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700"
            >
              Sair
            </Button>
          </header>

          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Informações do Cliente e Fidelidade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Meus Dados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-barbershop-gray-200">
                      <Phone className="w-4 h-4" />
                      <span>{dadosCliente.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-barbershop-gray-200">
                      <Mail className="w-4 h-4" />
                      <span>{dadosCliente.email}</span>
                    </div>
                    <div className="text-barbershop-gray-400">
                      Cliente desde: {format(dadosCliente.clienteDesde, "MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                    <div className="text-barbershop-gray-400">
                      Total de cortes: {dadosCliente.totalCortes}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Programa de Fidelidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-barbershop-gray-200">Pontos Ativos:</span>
                      <span className="text-barbershop-gold font-bold text-lg">{dadosCliente.pontosAtivos}</span>
                    </div>
                    <div className="w-full bg-barbershop-gray-700 rounded-full h-3">
                      <div 
                        className="bg-barbershop-gold h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(dadosCliente.pontosAtivos / dadosCliente.proximaRecompensa) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center text-barbershop-gray-400 text-sm">
                      Faltam {dadosCliente.proximaRecompensa - dadosCliente.pontosAtivos} pontos para próxima recompensa
                    </div>
                    <div className="flex items-center gap-2 justify-center text-barbershop-gold">
                      <Gift className="w-4 h-4" />
                      <span className="text-sm">Próxima recompensa: Corte Grátis</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Histórico de Agendamentos */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Meus Agendamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-barbershop-gray-600">
                        <TableHead className="text-barbershop-gray-300">Data</TableHead>
                        <TableHead className="text-barbershop-gray-300">Horário</TableHead>
                        <TableHead className="text-barbershop-gray-300">Serviço</TableHead>
                        <TableHead className="text-barbershop-gray-300">Profissional</TableHead>
                        <TableHead className="text-barbershop-gray-300">Status</TableHead>
                        <TableHead className="text-barbershop-gray-300">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agendamentosCliente.map((agendamento) => (
                        <TableRow key={agendamento.id} className="border-barbershop-gray-600">
                          <TableCell className="text-barbershop-gray-200">
                            {format(agendamento.data, "dd/MM/yyyy", { locale: ptBR })}
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {agendamento.horario}
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">{agendamento.servico}</TableCell>
                          <TableCell className="text-barbershop-gray-200">{agendamento.profissional}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(agendamento.status)} text-white`}>
                              {agendamento.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-barbershop-gold font-medium">{agendamento.preco}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Cliente;
