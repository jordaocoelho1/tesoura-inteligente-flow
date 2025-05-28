
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, User, Scissors, Phone, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const agendamentosBarbeiro = [
  {
    id: "1",
    cliente: "Carlos Oliveira",
    telefone: "(11) 99999-9999",
    servico: "Corte + Barba",
    data: new Date(2025, 0, 30),
    horario: "14:00",
    status: "Confirmado",
    preco: "R$ 55,00"
  },
  {
    id: "2",
    cliente: "Pedro Silva",
    telefone: "(11) 88888-8888",
    servico: "Corte Masculino",
    data: new Date(2025, 0, 30),
    horario: "15:30",
    status: "Confirmado",
    preco: "R$ 35,00"
  },
  {
    id: "3",
    cliente: "João Santos",
    telefone: "(11) 77777-7777",
    servico: "Barba",
    data: new Date(2025, 0, 30),
    horario: "16:00",
    status: "Pendente",
    preco: "R$ 25,00"
  },
  {
    id: "4",
    cliente: "Marcos Costa",
    telefone: "(11) 66666-6666",
    servico: "Corte + Barba",
    data: new Date(2025, 0, 29),
    horario: "10:00",
    status: "Concluído",
    preco: "R$ 55,00"
  }
];

const profissionais = [
  { id: "1", nome: "João Silva" },
  { id: "2", nome: "Pedro Santos" },
  { id: "3", nome: "Carlos Oliveira" }
];

const Barbeiro = () => {
  const [codigo, setCodigo] = useState("");
  const [barbeiroLogado, setBarbeiroLogado] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("1");
  const [filtroData, setFiltroData] = useState("hoje");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (codigo) {
      setBarbeiroLogado(true);
    }
  };

  const handleStatusChange = (agendamentoId: string, novoStatus: string) => {
    console.log(`Alterando status do agendamento ${agendamentoId} para ${novoStatus}`);
    // Aqui seria implementada a lógica para atualizar o status
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "bg-green-600";
      case "Concluído":
        return "bg-blue-600";
      case "Pendente":
        return "bg-yellow-600";
      case "Cancelado":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const filtrarAgendamentos = () => {
    const hoje = new Date();
    return agendamentosBarbeiro.filter(agendamento => {
      if (filtroData === "hoje") {
        return agendamento.data.toDateString() === hoje.toDateString();
      } else if (filtroData === "amanha") {
        const amanha = new Date(hoje);
        amanha.setDate(hoje.getDate() + 1);
        return agendamento.data.toDateString() === amanha.toDateString();
      }
      return true; // "todos"
    });
  };

  if (!barbeiroLogado) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-barbershop-black">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
              <div>
                <h1 className="text-2xl font-bold text-barbershop-gold">Área do Profissional</h1>
                <p className="text-barbershop-gray-300 text-sm">Acesse sua agenda</p>
              </div>
            </header>

            <main className="flex-1 p-6 bg-barbershop-gray-900 flex items-center justify-center">
              <Card className="w-full max-w-md bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold text-center">Login do Profissional</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="codigo" className="text-barbershop-gray-200">Código de Acesso</Label>
                      <Input
                        id="codigo"
                        type="password"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                        placeholder="Digite seu código"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark"
                    >
                      Acessar Agenda
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

  const agendamentosFiltrados = filtrarAgendamentos();
  const profissionalAtual = profissionais.find(p => p.id === profissionalSelecionado);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-barbershop-gold">Minha Agenda</h1>
              <p className="text-barbershop-gray-300 text-sm">Olá, {profissionalAtual?.nome}</p>
            </div>
            <Button 
              onClick={() => setBarbeiroLogado(false)}
              variant="outline"
              className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700"
            >
              Sair
            </Button>
          </header>

          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Filtros e Resumo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold">Filtros</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-barbershop-gray-200">Profissional</Label>
                      <Select value={profissionalSelecionado} onValueChange={setProfissionalSelecionado}>
                        <SelectTrigger className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-barbershop-gray-700 border-barbershop-gray-600">
                          {profissionais.map((prof) => (
                            <SelectItem key={prof.id} value={prof.id} className="text-white hover:bg-barbershop-gray-600">
                              {prof.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-barbershop-gray-200">Período</Label>
                      <Select value={filtroData} onValueChange={setFiltroData}>
                        <SelectTrigger className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-barbershop-gray-700 border-barbershop-gray-600">
                          <SelectItem value="hoje" className="text-white hover:bg-barbershop-gray-600">Hoje</SelectItem>
                          <SelectItem value="amanha" className="text-white hover:bg-barbershop-gray-600">Amanhã</SelectItem>
                          <SelectItem value="todos" className="text-white hover:bg-barbershop-gray-600">Todos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Resumo do Dia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-barbershop-gray-200">
                        <span>Total de agendamentos:</span>
                        <span className="text-barbershop-gold font-bold">{agendamentosFiltrados.length}</span>
                      </div>
                      <div className="flex justify-between text-barbershop-gray-200">
                        <span>Confirmados:</span>
                        <span className="text-green-400">
                          {agendamentosFiltrados.filter(a => a.status === "Confirmado").length}
                        </span>
                      </div>
                      <div className="flex justify-between text-barbershop-gray-200">
                        <span>Pendentes:</span>
                        <span className="text-yellow-400">
                          {agendamentosFiltrados.filter(a => a.status === "Pendente").length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold flex items-center gap-2">
                      <Scissors className="w-5 h-5" />
                      Faturamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-barbershop-gray-200">
                        <span>Hoje:</span>
                        <span className="text-barbershop-gold font-bold">R$ 115,00</span>
                      </div>
                      <div className="flex justify-between text-barbershop-gray-200">
                        <span>Esta semana:</span>
                        <span className="text-barbershop-gold">R$ 680,00</span>
                      </div>
                      <div className="flex justify-between text-barbershop-gray-200">
                        <span>Este mês:</span>
                        <span className="text-barbershop-gold">R$ 2.450,00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de Agendamentos */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Agendamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-barbershop-gray-600">
                        <TableHead className="text-barbershop-gray-300">Data</TableHead>
                        <TableHead className="text-barbershop-gray-300">Horário</TableHead>
                        <TableHead className="text-barbershop-gray-300">Cliente</TableHead>
                        <TableHead className="text-barbershop-gray-300">Telefone</TableHead>
                        <TableHead className="text-barbershop-gray-300">Serviço</TableHead>
                        <TableHead className="text-barbershop-gray-300">Status</TableHead>
                        <TableHead className="text-barbershop-gray-300">Valor</TableHead>
                        <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agendamentosFiltrados.map((agendamento) => (
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
                          <TableCell className="text-barbershop-gray-200">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {agendamento.cliente}
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {agendamento.telefone}
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">{agendamento.servico}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(agendamento.status)} text-white`}>
                              {agendamento.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-barbershop-gold font-medium">{agendamento.preco}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {agendamento.status === "Pendente" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(agendamento.id, "Confirmado")}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              {agendamento.status === "Confirmado" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(agendamento.id, "Concluído")}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              {agendamento.status !== "Concluído" && (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusChange(agendamento.id, "Cancelado")}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
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

export default Barbeiro;
