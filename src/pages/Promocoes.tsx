
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Tag, 
  Calendar,
  Percent,
  Users,
  Eye,
  BarChart3
} from "lucide-react";

interface Promocao {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'desconto_percentual' | 'desconto_fixo' | 'servico_gratis' | 'combo';
  valor: number;
  codigo: string;
  dataInicio: string;
  dataFim: string;
  servicosAplicaveis: string[];
  limitePorCliente: number;
  totalUsos: number;
  ativo: boolean;
  termos: string;
}

const Promocoes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todas");
  const [showForm, setShowForm] = useState(false);

  // Mock data
  const promocoes: Promocao[] = [
    {
      id: "1",
      nome: "Desconto de Volta às Aulas",
      descricao: "20% de desconto em cortes masculinos",
      tipo: "desconto_percentual",
      valor: 20,
      codigo: "VOLTAESCOLA20",
      dataInicio: "2024-01-15",
      dataFim: "2024-02-29",
      servicosAplicaveis: ["Corte Masculino", "Barba"],
      limitePorCliente: 1,
      totalUsos: 45,
      ativo: true,
      termos: "Válido apenas para novos clientes"
    },
    {
      id: "2",
      nome: "Combo Completo",
      descricao: "Corte + Barba + Sobrancelha por R$ 60",
      tipo: "combo",
      valor: 60,
      codigo: "COMBO60",
      dataInicio: "2024-01-01",
      dataFim: "2024-12-31",
      servicosAplicaveis: ["Corte Masculino", "Barba", "Sobrancelha"],
      limitePorCliente: 5,
      totalUsos: 128,
      ativo: true,
      termos: "Não cumulativo com outras promoções"
    }
  ];

  const filteredPromocoes = promocoes.filter(promocao => {
    const matchesSearch = promocao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promocao.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "todas" || 
                         (filterStatus === "ativas" && promocao.ativo) ||
                         (filterStatus === "inativas" && !promocao.ativo);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalPromocoes: promocoes.length,
    promocoesAtivas: promocoes.filter(p => p.ativo).length,
    totalUsos: promocoes.reduce((sum, p) => sum + p.totalUsos, 0),
    economiaGerada: "R$ 2.340"
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-barbershop-gold hover:text-barbershop-gold-light" />
              <div>
                <h1 className="text-2xl font-bold text-barbershop-gold">Promoções</h1>
                <p className="text-barbershop-gray-300 text-sm">Gerencie ofertas e campanhas promocionais</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-light"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Promoção
            </Button>
          </header>

          <main className="flex-1 p-6 space-y-6 bg-barbershop-gray-900">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-barbershop-gray-100">
                    Total de Promoções
                  </CardTitle>
                  <Tag className="h-4 w-4 text-barbershop-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-barbershop-gold">{stats.totalPromocoes}</div>
                </CardContent>
              </Card>

              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-barbershop-gray-100">
                    Promoções Ativas
                  </CardTitle>
                  <Percent className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{stats.promocoesAtivas}</div>
                </CardContent>
              </Card>

              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-barbershop-gray-100">
                    Total de Usos
                  </CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">{stats.totalUsos}</div>
                </CardContent>
              </Card>

              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-barbershop-gray-100">
                    Economia Gerada
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-barbershop-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-barbershop-gold">{stats.economiaGerada}</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-barbershop-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar promoções..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-barbershop-gray-700 border-barbershop-gray-600 text-barbershop-gray-100"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-barbershop-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-barbershop-gray-700 border border-barbershop-gray-600 text-barbershop-gray-100 rounded-md px-3 py-2"
                    >
                      <option value="todas">Todas</option>
                      <option value="ativas">Ativas</option>
                      <option value="inativas">Inativas</option>
                    </select>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-barbershop-gray-700">
                      <TableHead className="text-barbershop-gray-300">Nome</TableHead>
                      <TableHead className="text-barbershop-gray-300">Código</TableHead>
                      <TableHead className="text-barbershop-gray-300">Tipo</TableHead>
                      <TableHead className="text-barbershop-gray-300">Valor</TableHead>
                      <TableHead className="text-barbershop-gray-300">Período</TableHead>
                      <TableHead className="text-barbershop-gray-300">Usos</TableHead>
                      <TableHead className="text-barbershop-gray-300">Status</TableHead>
                      <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPromocoes.map((promocao) => (
                      <TableRow key={promocao.id} className="border-barbershop-gray-700">
                        <TableCell>
                          <div>
                            <p className="font-medium text-barbershop-gray-100">{promocao.nome}</p>
                            <p className="text-sm text-barbershop-gray-400">{promocao.descricao}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-barbershop-gold border-barbershop-gold">
                            {promocao.codigo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-barbershop-gray-300">
                          {promocao.tipo === 'desconto_percentual' && 'Desconto %'}
                          {promocao.tipo === 'desconto_fixo' && 'Desconto Fixo'}
                          {promocao.tipo === 'servico_gratis' && 'Serviço Grátis'}
                          {promocao.tipo === 'combo' && 'Combo'}
                        </TableCell>
                        <TableCell className="text-barbershop-gray-300">
                          {promocao.tipo === 'desconto_percentual' ? `${promocao.valor}%` : 
                           promocao.tipo === 'combo' ? `R$ ${promocao.valor}` : 
                           `R$ ${promocao.valor}`}
                        </TableCell>
                        <TableCell className="text-barbershop-gray-300">
                          <div className="text-sm">
                            <div>{new Date(promocao.dataInicio).toLocaleDateString('pt-BR')}</div>
                            <div>até {new Date(promocao.dataFim).toLocaleDateString('pt-BR')}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-barbershop-gray-300">
                          {promocao.totalUsos}/{promocao.limitePorCliente > 0 ? `${promocao.limitePorCliente} por cliente` : '∞'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={promocao.ativo ? "default" : "secondary"}
                            className={promocao.ativo ? "bg-green-600" : "bg-red-600"}
                          >
                            {promocao.ativo ? "Ativa" : "Inativa"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-barbershop-gray-300 hover:text-barbershop-gold">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-barbershop-gray-300 hover:text-barbershop-gold">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Form Modal */}
            {showForm && (
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold">Nova Promoção</CardTitle>
                  <CardDescription className="text-barbershop-gray-300">
                    Preencha os dados da nova promoção
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-barbershop-gray-300 mb-2">
                        Nome da Promoção
                      </label>
                      <Input 
                        placeholder="Ex: Desconto de Verão"
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-barbershop-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-barbershop-gray-300 mb-2">
                        Código
                      </label>
                      <Input 
                        placeholder="Ex: VERAO2024"
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-barbershop-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-barbershop-gray-300 mb-2">
                      Descrição
                    </label>
                    <Textarea 
                      placeholder="Descreva a promoção..."
                      className="bg-barbershop-gray-700 border-barbershop-gray-600 text-barbershop-gray-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-barbershop-gray-300 mb-2">
                        Tipo de Promoção
                      </label>
                      <select className="w-full bg-barbershop-gray-700 border border-barbershop-gray-600 text-barbershop-gray-100 rounded-md px-3 py-2">
                        <option value="desconto_percentual">Desconto Percentual</option>
                        <option value="desconto_fixo">Desconto Fixo</option>
                        <option value="servico_gratis">Serviço Grátis</option>
                        <option value="combo">Combo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-barbershop-gray-300 mb-2">
                        Valor
                      </label>
                      <Input 
                        type="number"
                        placeholder="0"
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-barbershop-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-barbershop-gray-300 mb-2">
                        Limite por Cliente
                      </label>
                      <Input 
                        type="number"
                        placeholder="1"
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-barbershop-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-barbershop-gray-300 mb-2">
                        Data de Início
                      </label>
                      <Input 
                        type="date"
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-barbershop-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-barbershop-gray-300 mb-2">
                        Data de Fim
                      </label>
                      <Input 
                        type="date"
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-barbershop-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-barbershop-gray-300 mb-2">
                      Termos e Condições
                    </label>
                    <Textarea 
                      placeholder="Condições da promoção..."
                      className="bg-barbershop-gray-700 border-barbershop-gray-600 text-barbershop-gray-100"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-4 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowForm(false)}
                      className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700"
                    >
                      Cancelar
                    </Button>
                    <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-light">
                      Salvar Promoção
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Promocoes;
