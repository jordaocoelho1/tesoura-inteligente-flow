
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, UserPlus, Phone, Mail, Calendar, Star } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const clientesData = [
  {
    id: "1",
    nome: "Carlos Oliveira",
    telefone: "(11) 99999-9999",
    email: "carlos@email.com",
    ultimoCorte: new Date(2025, 0, 15),
    totalCortes: 12,
    pontos: 85,
    status: "Ativo"
  },
  {
    id: "2",
    nome: "João Santos",
    telefone: "(11) 88888-8888",
    email: "joao@email.com",
    ultimoCorte: new Date(2025, 0, 10),
    totalCortes: 8,
    pontos: 120,
    status: "Ativo"
  },
  {
    id: "3",
    nome: "Pedro Silva",
    telefone: "(11) 77777-7777",
    email: "pedro@email.com",
    ultimoCorte: new Date(2024, 11, 20),
    totalCortes: 5,
    pontos: 45,
    status: "Inativo"
  }
];

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClientes, setFilteredClientes] = useState(clientesData);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredClientes(clientesData);
    } else {
      const filtered = clientesData.filter(cliente =>
        cliente.nome.toLowerCase().includes(term.toLowerCase()) ||
        cliente.telefone.includes(term) ||
        cliente.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredClientes(filtered);
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
              <h1 className="text-2xl font-bold text-barbershop-gold">Clientes</h1>
              <p className="text-barbershop-gray-300 text-sm">Gerencie sua base de clientes</p>
            </div>
            <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Cliente
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
                        <p className="text-barbershop-gray-400 text-sm">Total de Clientes</p>
                        <p className="text-2xl font-bold text-barbershop-gold">156</p>
                      </div>
                      <Users className="w-8 h-8 text-barbershop-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Clientes Ativos</p>
                        <p className="text-2xl font-bold text-green-400">142</p>
                      </div>
                      <Star className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Novos este Mês</p>
                        <p className="text-2xl font-bold text-blue-400">23</p>
                      </div>
                      <UserPlus className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Aniversários Hoje</p>
                        <p className="text-2xl font-bold text-purple-400">3</p>
                      </div>
                      <Calendar className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Busca e Filtros */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-barbershop-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar cliente por nome, telefone ou email..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tabela de Clientes */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold">Lista de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-barbershop-gray-600">
                        <TableHead className="text-barbershop-gray-300">Nome</TableHead>
                        <TableHead className="text-barbershop-gray-300">Contato</TableHead>
                        <TableHead className="text-barbershop-gray-300">Último Corte</TableHead>
                        <TableHead className="text-barbershop-gray-300">Total Cortes</TableHead>
                        <TableHead className="text-barbershop-gray-300">Pontos</TableHead>
                        <TableHead className="text-barbershop-gray-300">Status</TableHead>
                        <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClientes.map((cliente) => (
                        <TableRow key={cliente.id} className="border-barbershop-gray-600">
                          <TableCell className="text-barbershop-gray-200 font-medium">
                            {cliente.nome}
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span className="text-xs">{cliente.telefone}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <span className="text-xs">{cliente.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            {format(cliente.ultimoCorte, "dd/MM/yyyy", { locale: ptBR })}
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">{cliente.totalCortes}</TableCell>
                          <TableCell className="text-barbershop-gold font-medium">{cliente.pontos}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(cliente.status)} text-white`}>
                              {cliente.status}
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

export default Clientes;
