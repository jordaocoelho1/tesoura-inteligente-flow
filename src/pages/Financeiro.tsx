
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const transacoes = [
  {
    id: "1",
    tipo: "Receita",
    descricao: "Corte + Barba - Carlos Oliveira",
    valor: 55.00,
    data: new Date(2025, 0, 29),
    formaPagamento: "PIX",
    status: "Confirmado"
  },
  {
    id: "2",
    tipo: "Receita",
    descricao: "Corte Masculino - João Santos",
    valor: 35.00,
    data: new Date(2025, 0, 29),
    formaPagamento: "Cartão",
    status: "Confirmado"
  },
  {
    id: "3",
    tipo: "Despesa",
    descricao: "Compra de produtos - Beauty Supplies",
    valor: -230.00,
    data: new Date(2025, 0, 28),
    formaPagamento: "Transferência",
    status: "Pago"
  },
  {
    id: "4",
    tipo: "Receita",
    descricao: "Barba - Pedro Silva",
    valor: 25.00,
    data: new Date(2025, 0, 28),
    formaPagamento: "Dinheiro",
    status: "Confirmado"
  }
];

const Financeiro = () => {
  const receitaTotal = transacoes.filter(t => t.tipo === "Receita").reduce((sum, t) => sum + t.valor, 0);
  const despesaTotal = Math.abs(transacoes.filter(t => t.tipo === "Despesa").reduce((sum, t) => sum + t.valor, 0));
  const lucroLiquido = receitaTotal - despesaTotal;

  const getTipoColor = (tipo: string) => {
    return tipo === "Receita" ? "bg-green-600" : "bg-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
      case "Pago":
        return "bg-green-600";
      case "Pendente":
        return "bg-yellow-600";
      case "Cancelado":
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
              <h1 className="text-2xl font-bold text-barbershop-gold">Financeiro</h1>
              <p className="text-barbershop-gray-300 text-sm">Controle financeiro completo</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                <FileText className="w-4 h-4 mr-2" />
                Relatório
              </Button>
              <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                <DollarSign className="w-4 h-4 mr-2" />
                Nova Transação
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Cards de Resumo Financeiro */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Receita do Mês</p>
                        <p className="text-2xl font-bold text-green-400">R$ {receitaTotal.toFixed(2)}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Despesas do Mês</p>
                        <p className="text-2xl font-bold text-red-400">R$ {despesaTotal.toFixed(2)}</p>
                      </div>
                      <TrendingDown className="w-8 h-8 text-red-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Lucro Líquido</p>
                        <p className={`text-2xl font-bold ${lucroLiquido >= 0 ? 'text-barbershop-gold' : 'text-red-400'}`}>
                          R$ {lucroLiquido.toFixed(2)}
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-barbershop-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Transações Hoje</p>
                        <p className="text-2xl font-bold text-blue-400">12</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filtros de Período */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-barbershop-gold" />
                    <span className="text-barbershop-gray-200 font-medium">Período:</span>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                        Hoje
                      </Button>
                      <Button size="sm" variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                        Esta Semana
                      </Button>
                      <Button size="sm" variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                        Este Mês
                      </Button>
                      <Button size="sm" variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                        Personalizado
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabela de Transações */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold">Transações Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-barbershop-gray-600">
                        <TableHead className="text-barbershop-gray-300">Data</TableHead>
                        <TableHead className="text-barbershop-gray-300">Tipo</TableHead>
                        <TableHead className="text-barbershop-gray-300">Descrição</TableHead>
                        <TableHead className="text-barbershop-gray-300">Forma Pagamento</TableHead>
                        <TableHead className="text-barbershop-gray-300">Valor</TableHead>
                        <TableHead className="text-barbershop-gray-300">Status</TableHead>
                        <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transacoes.map((transacao) => (
                        <TableRow key={transacao.id} className="border-barbershop-gray-600">
                          <TableCell className="text-barbershop-gray-200">
                            {format(transacao.data, "dd/MM/yyyy", { locale: ptBR })}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getTipoColor(transacao.tipo)} text-white`}>
                              {transacao.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">{transacao.descricao}</TableCell>
                          <TableCell className="text-barbershop-gray-200">{transacao.formaPagamento}</TableCell>
                          <TableCell className={`font-medium ${transacao.valor >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            R$ {Math.abs(transacao.valor).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(transacao.status)} text-white`}>
                              {transacao.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                                Ver
                              </Button>
                              <Button size="sm" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                                Editar
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

export default Financeiro;
