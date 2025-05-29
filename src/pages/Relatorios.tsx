
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileText, Download, Calendar, Users, DollarSign, TrendingUp } from "lucide-react";

const relatoriosDisponiveis = [
  {
    id: "1",
    nome: "Relatório de Vendas",
    descricao: "Análise completa das vendas por período",
    tipo: "Financeiro",
    ultimaGeracao: "29/01/2025",
    status: "Disponível"
  },
  {
    id: "2",
    nome: "Performance dos Profissionais",
    descricao: "Avaliação do desempenho da equipe",
    tipo: "Recursos Humanos",
    ultimaGeracao: "28/01/2025",
    status: "Disponível"
  },
  {
    id: "3",
    nome: "Análise de Clientes",
    descricao: "Dados sobre base de clientes e fidelidade",
    tipo: "Marketing",
    ultimaGeracao: "27/01/2025",
    status: "Disponível"
  },
  {
    id: "4",
    nome: "Controle de Estoque",
    descricao: "Movimentação e níveis de produtos",
    tipo: "Operacional",
    ultimaGeracao: "26/01/2025",
    status: "Processando"
  },
  {
    id: "5",
    nome: "Fluxo de Caixa",
    descricao: "Entradas e saídas financeiras detalhadas",
    tipo: "Financeiro",
    ultimaGeracao: "25/01/2025",
    status: "Disponível"
  }
];

const Relatorios = () => {
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Financeiro":
        return "bg-green-600";
      case "Recursos Humanos":
        return "bg-blue-600";
      case "Marketing":
        return "bg-purple-600";
      case "Operacional":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível":
        return "bg-green-600";
      case "Processando":
        return "bg-yellow-600";
      case "Erro":
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
              <h1 className="text-2xl font-bold text-barbershop-gold">Relatórios</h1>
              <p className="text-barbershop-gray-300 text-sm">Análises e insights do negócio</p>
            </div>
            <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
              <FileText className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
          </header>

          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Cards de Métricas Rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Relatórios Gerados</p>
                        <p className="text-2xl font-bold text-barbershop-gold">156</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-barbershop-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Este Mês</p>
                        <p className="text-2xl font-bold text-blue-400">24</p>
                      </div>
                      <Calendar className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Tipos Disponíveis</p>
                        <p className="text-2xl font-bold text-purple-400">12</p>
                      </div>
                      <FileText className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Downloads</p>
                        <p className="text-2xl font-bold text-green-400">89</p>
                      </div>
                      <Download className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Relatórios Rápidos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700 hover:bg-barbershop-gray-750 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-barbershop-gold font-semibold">Vendas do Dia</h3>
                        <p className="text-barbershop-gray-400 text-sm">Receita e transações de hoje</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700 hover:bg-barbershop-gray-750 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-barbershop-gold font-semibold">Clientes Ativos</h3>
                        <p className="text-barbershop-gray-400 text-sm">Base de clientes atual</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700 hover:bg-barbershop-gray-750 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-barbershop-gold font-semibold">Performance Mensal</h3>
                        <p className="text-barbershop-gray-400 text-sm">Análise do mês atual</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de Relatórios */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold">Relatórios Disponíveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatoriosDisponiveis.map((relatorio) => (
                      <div
                        key={relatorio.id}
                        className="flex items-center justify-between p-4 bg-barbershop-gray-900 rounded-lg border border-barbershop-gray-600"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-barbershop-gold rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-barbershop-black" />
                          </div>
                          <div>
                            <h3 className="text-barbershop-gray-200 font-medium">{relatorio.nome}</h3>
                            <p className="text-barbershop-gray-400 text-sm">{relatorio.descricao}</p>
                            <p className="text-barbershop-gray-500 text-xs">Última geração: {relatorio.ultimaGeracao}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`${getTipoColor(relatorio.tipo)} text-white`}>
                            {relatorio.tipo}
                          </Badge>
                          <Badge className={`${getStatusColor(relatorio.status)} text-white`}>
                            {relatorio.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                              Gerar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Relatorios;
