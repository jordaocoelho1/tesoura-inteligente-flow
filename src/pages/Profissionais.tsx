
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Search, UserPlus, Phone, Mail, Star, Scissors } from "lucide-react";

const profissionaisData = [
  {
    id: "1",
    nome: "João Silva",
    telefone: "(11) 99999-9999",
    email: "joao@barbershop.com",
    especialidade: "Corte e Barba",
    avaliacao: 4.8,
    clientesAtendidos: 156,
    status: "Ativo",
    comissao: "40%"
  },
  {
    id: "2",
    nome: "Pedro Santos",
    telefone: "(11) 88888-8888",
    email: "pedro@barbershop.com",
    especialidade: "Corte Masculino",
    avaliacao: 4.6,
    clientesAtendidos: 98,
    status: "Ativo",
    comissao: "35%"
  },
  {
    id: "3",
    nome: "Lucas Oliveira",
    telefone: "(11) 77777-7777",
    email: "lucas@barbershop.com",
    especialidade: "Barba e Bigode",
    avaliacao: 4.9,
    clientesAtendidos: 203,
    status: "Férias",
    comissao: "45%"
  }
];

const Profissionais = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfissionais, setFilteredProfissionais] = useState(profissionaisData);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredProfissionais(profissionaisData);
    } else {
      const filtered = profissionaisData.filter(profissional =>
        profissional.nome.toLowerCase().includes(term.toLowerCase()) ||
        profissional.especialidade.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProfissionais(filtered);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-600";
      case "Férias":
        return "bg-yellow-600";
      case "Inativo":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-barbershop-gold">Profissionais</h1>
              <p className="text-barbershop-gray-300 text-sm">Gerencie sua equipe de barbeiros</p>
            </div>
            <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Profissional
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
                        <p className="text-barbershop-gray-400 text-sm">Total Profissionais</p>
                        <p className="text-2xl font-bold text-barbershop-gold">8</p>
                      </div>
                      <User className="w-8 h-8 text-barbershop-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Ativos Hoje</p>
                        <p className="text-2xl font-bold text-green-400">6</p>
                      </div>
                      <Scissors className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Avaliação Média</p>
                        <p className="text-2xl font-bold text-yellow-400">4.7</p>
                      </div>
                      <Star className="w-8 h-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Em Férias</p>
                        <p className="text-2xl font-bold text-orange-400">2</p>
                      </div>
                      <User className="w-8 h-8 text-orange-400" />
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
                      placeholder="Buscar profissional por nome ou especialidade..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tabela de Profissionais */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold">Equipe de Profissionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-barbershop-gray-600">
                        <TableHead className="text-barbershop-gray-300">Nome</TableHead>
                        <TableHead className="text-barbershop-gray-300">Contato</TableHead>
                        <TableHead className="text-barbershop-gray-300">Especialidade</TableHead>
                        <TableHead className="text-barbershop-gray-300">Avaliação</TableHead>
                        <TableHead className="text-barbershop-gray-300">Clientes</TableHead>
                        <TableHead className="text-barbershop-gray-300">Comissão</TableHead>
                        <TableHead className="text-barbershop-gray-300">Status</TableHead>
                        <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProfissionais.map((profissional) => (
                        <TableRow key={profissional.id} className="border-barbershop-gray-600">
                          <TableCell className="text-barbershop-gray-200 font-medium">
                            {profissional.nome}
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span className="text-xs">{profissional.telefone}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <span className="text-xs">{profissional.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">{profissional.especialidade}</TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{profissional.avaliacao}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">{profissional.clientesAtendidos}</TableCell>
                          <TableCell className="text-barbershop-gold font-medium">{profissional.comissao}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(profissional.status)} text-white`}>
                              {profissional.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                                Editar
                              </Button>
                              <Button size="sm" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                                Agenda
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

export default Profissionais;
