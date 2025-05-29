
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Scissors, Search, Plus, Clock, DollarSign } from "lucide-react";

const servicosData = [
  {
    id: "1",
    nome: "Corte Masculino",
    descricao: "Corte tradicional masculino com máquina e tesoura",
    preco: 35.00,
    duracao: 30,
    categoria: "Corte",
    status: "Ativo"
  },
  {
    id: "2",
    nome: "Barba Completa",
    descricao: "Aparar e modelar barba com produtos premium",
    preco: 25.00,
    duracao: 20,
    categoria: "Barba",
    status: "Ativo"
  },
  {
    id: "3",
    nome: "Corte + Barba",
    descricao: "Combo completo de corte e barba",
    preco: 55.00,
    duracao: 45,
    categoria: "Combo",
    status: "Ativo"
  },
  {
    id: "4",
    nome: "Corte Infantil",
    descricao: "Corte especial para crianças até 12 anos",
    preco: 25.00,
    duracao: 25,
    categoria: "Infantil",
    status: "Ativo"
  },
  {
    id: "5",
    nome: "Lavagem + Hidratação",
    descricao: "Tratamento capilar com produtos profissionais",
    preco: 20.00,
    duracao: 15,
    categoria: "Tratamento",
    status: "Inativo"
  }
];

const Servicos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServicos, setFilteredServicos] = useState(servicosData);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredServicos(servicosData);
    } else {
      const filtered = servicosData.filter(servico =>
        servico.nome.toLowerCase().includes(term.toLowerCase()) ||
        servico.categoria.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredServicos(filtered);
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Corte":
        return "bg-blue-600";
      case "Barba":
        return "bg-green-600";
      case "Combo":
        return "bg-purple-600";
      case "Infantil":
        return "bg-yellow-600";
      case "Tratamento":
        return "bg-pink-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Ativo" ? "bg-green-600" : "bg-red-600";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-barbershop-gold">Serviços</h1>
              <p className="text-barbershop-gray-300 text-sm">Gerencie os serviços oferecidos</p>
            </div>
            <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
              <Plus className="w-4 h-4 mr-2" />
              Novo Serviço
            </Button>
          </header>

          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Cards de Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Total Serviços</p>
                        <p className="text-2xl font-bold text-barbershop-gold">15</p>
                      </div>
                      <Scissors className="w-8 h-8 text-barbershop-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Serviços Ativos</p>
                        <p className="text-2xl font-bold text-green-400">12</p>
                      </div>
                      <Scissors className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Preço Médio</p>
                        <p className="text-2xl font-bold text-blue-400">R$ 32</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Duração Média</p>
                        <p className="text-2xl font-bold text-purple-400">28min</p>
                      </div>
                      <Clock className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Busca */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-barbershop-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar serviço por nome ou categoria..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tabela de Serviços */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold">Lista de Serviços</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-barbershop-gray-600">
                        <TableHead className="text-barbershop-gray-300">Serviço</TableHead>
                        <TableHead className="text-barbershop-gray-300">Categoria</TableHead>
                        <TableHead className="text-barbershop-gray-300">Preço</TableHead>
                        <TableHead className="text-barbershop-gray-300">Duração</TableHead>
                        <TableHead className="text-barbershop-gray-300">Status</TableHead>
                        <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServicos.map((servico) => (
                        <TableRow key={servico.id} className="border-barbershop-gray-600">
                          <TableCell className="text-barbershop-gray-200">
                            <div>
                              <div className="font-medium">{servico.nome}</div>
                              <div className="text-sm text-barbershop-gray-400">{servico.descricao}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getCategoriaColor(servico.categoria)} text-white`}>
                              {servico.categoria}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-barbershop-gold font-medium">
                            R$ {servico.preco.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {servico.duracao}min
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(servico.status)} text-white`}>
                              {servico.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                                Editar
                              </Button>
                              <Button size="sm" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                                Agendar
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

export default Servicos;
