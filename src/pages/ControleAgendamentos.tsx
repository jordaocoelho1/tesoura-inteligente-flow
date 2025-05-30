
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, Filter, Clock, User, Scissors, CheckCircle, XCircle, AlertCircle, Plus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const agendamentosData = [
  {
    id: "AGD001",
    cliente: "Carlos Oliveira",
    barbeiro: "Roberto Silva",
    servico: "Corte + Barba",
    data: new Date(2025, 0, 30, 9, 0),
    duracao: 60,
    valor: 45.00,
    status: "Confirmado",
    telefone: "(11) 99999-9999"
  },
  {
    id: "AGD002",
    cliente: "João Santos",
    barbeiro: "Carlos Mendes",
    servico: "Corte Tradicional",
    data: new Date(2025, 0, 30, 10, 30),
    duracao: 45,
    valor: 30.00,
    status: "Em Andamento",
    telefone: "(11) 88888-8888"
  },
  {
    id: "AGD003",
    cliente: "Pedro Silva",
    barbeiro: "Roberto Silva",
    servico: "Barba + Sobrancelha",
    data: new Date(2025, 0, 30, 14, 0),
    duracao: 30,
    valor: 25.00,
    status: "Pendente",
    telefone: "(11) 77777-7777"
  },
  {
    id: "AGD004",
    cliente: "Lucas Costa",
    barbeiro: "Carlos Mendes",
    servico: "Corte + Barba + Sobrancelha",
    data: new Date(2025, 0, 30, 16, 0),
    duracao: 90,
    valor: 65.00,
    status: "Cancelado",
    telefone: "(11) 66666-6666"
  },
  {
    id: "AGD005",
    cliente: "Marcos Oliveira",
    barbeiro: "Roberto Silva",
    servico: "Corte Degradê",
    data: new Date(2025, 0, 31, 9, 30),
    duracao: 50,
    valor: 35.00,
    status: "Confirmado",
    telefone: "(11) 55555-5555"
  }
];

const ControleAgendamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [barbeiroFilter, setBarbeiroFilter] = useState("todos");
  const [filteredAgendamentos, setFilteredAgendamentos] = useState(agendamentosData);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, statusFilter, barbeiroFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status, barbeiroFilter);
  };

  const handleBarbeiroFilter = (barbeiro: string) => {
    setBarbeiroFilter(barbeiro);
    applyFilters(searchTerm, statusFilter, barbeiro);
  };

  const applyFilters = (search: string, status: string, barbeiro: string) => {
    let filtered = agendamentosData;

    if (search) {
      filtered = filtered.filter(agendamento =>
        agendamento.cliente.toLowerCase().includes(search.toLowerCase()) ||
        agendamento.id.toLowerCase().includes(search.toLowerCase()) ||
        agendamento.telefone.includes(search)
      );
    }

    if (status !== "todos") {
      filtered = filtered.filter(agendamento => agendamento.status === status);
    }

    if (barbeiro !== "todos") {
      filtered = filtered.filter(agendamento => agendamento.barbeiro === barbeiro);
    }

    setFilteredAgendamentos(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado": return "bg-green-600";
      case "Em Andamento": return "bg-blue-600";
      case "Pendente": return "bg-yellow-600";
      case "Cancelado": return "bg-red-600";
      case "Concluído": return "bg-purple-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Confirmado": return <CheckCircle className="w-4 h-4" />;
      case "Em Andamento": return <Clock className="w-4 h-4" />;
      case "Pendente": return <AlertCircle className="w-4 h-4" />;
      case "Cancelado": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const statusCounts = {
    total: agendamentosData.length,
    confirmados: agendamentosData.filter(a => a.status === "Confirmado").length,
    pendentes: agendamentosData.filter(a => a.status === "Pendente").length,
    emAndamento: agendamentosData.filter(a => a.status === "Em Andamento").length,
    cancelados: agendamentosData.filter(a => a.status === "Cancelado").length
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-barbershop-gold">Controle de Agendamentos</h1>
              <p className="text-barbershop-gray-300 text-sm">Gerencie todos os agendamentos da barbearia</p>
            </div>
            <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
          </header>

          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Cards de Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Total</p>
                        <p className="text-2xl font-bold text-barbershop-gold">{statusCounts.total}</p>
                      </div>
                      <Calendar className="w-6 h-6 text-barbershop-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Confirmados</p>
                        <p className="text-2xl font-bold text-green-400">{statusCounts.confirmados}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Em Andamento</p>
                        <p className="text-2xl font-bold text-blue-400">{statusCounts.emAndamento}</p>
                      </div>
                      <Clock className="w-6 h-6 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Pendentes</p>
                        <p className="text-2xl font-bold text-yellow-400">{statusCounts.pendentes}</p>
                      </div>
                      <AlertCircle className="w-6 h-6 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Cancelados</p>
                        <p className="text-2xl font-bold text-red-400">{statusCounts.cancelados}</p>
                      </div>
                      <XCircle className="w-6 h-6 text-red-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filtros */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-barbershop-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar por cliente, ID ou telefone..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                      />
                    </div>

                    <Select value={statusFilter} onValueChange={handleStatusFilter}>
                      <SelectTrigger className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white">
                        <SelectValue placeholder="Filtrar por status" />
                      </SelectTrigger>
                      <SelectContent className="bg-barbershop-gray-700 border-barbershop-gray-600">
                        <SelectItem value="todos">Todos os Status</SelectItem>
                        <SelectItem value="Confirmado">Confirmado</SelectItem>
                        <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={barbeiroFilter} onValueChange={handleBarbeiroFilter}>
                      <SelectTrigger className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white">
                        <SelectValue placeholder="Filtrar por barbeiro" />
                      </SelectTrigger>
                      <SelectContent className="bg-barbershop-gray-700 border-barbershop-gray-600">
                        <SelectItem value="todos">Todos os Barbeiros</SelectItem>
                        <SelectItem value="Roberto Silva">Roberto Silva</SelectItem>
                        <SelectItem value="Carlos Mendes">Carlos Mendes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Tabela de Agendamentos */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold">Agendamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-barbershop-gray-600">
                        <TableHead className="text-barbershop-gray-300">ID</TableHead>
                        <TableHead className="text-barbershop-gray-300">Cliente</TableHead>
                        <TableHead className="text-barbershop-gray-300">Barbeiro</TableHead>
                        <TableHead className="text-barbershop-gray-300">Serviço</TableHead>
                        <TableHead className="text-barbershop-gray-300">Data/Hora</TableHead>
                        <TableHead className="text-barbershop-gray-300">Duração</TableHead>
                        <TableHead className="text-barbershop-gray-300">Valor</TableHead>
                        <TableHead className="text-barbershop-gray-300">Status</TableHead>
                        <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAgendamentos.map((agendamento) => (
                        <TableRow key={agendamento.id} className="border-barbershop-gray-600">
                          <TableCell className="text-barbershop-gray-200 font-medium">
                            {agendamento.id}
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div>
                              <p className="font-medium">{agendamento.cliente}</p>
                              <p className="text-xs text-barbershop-gray-400">{agendamento.telefone}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {agendamento.barbeiro}
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div className="flex items-center gap-2">
                              <Scissors className="w-4 h-4" />
                              {agendamento.servico}
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div>
                              <p>{format(agendamento.data, "dd/MM/yyyy", { locale: ptBR })}</p>
                              <p className="text-xs text-barbershop-gray-400">
                                {format(agendamento.data, "HH:mm", { locale: ptBR })}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            {agendamento.duracao}min
                          </TableCell>
                          <TableCell className="text-barbershop-gold font-medium">
                            R$ {agendamento.valor.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(agendamento.status)} text-white flex items-center gap-1`}>
                              {getStatusIcon(agendamento.status)}
                              {agendamento.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                                Editar
                              </Button>
                              <Button size="sm" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                                Atualizar
                              </Button>
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

export default ControleAgendamentos;
