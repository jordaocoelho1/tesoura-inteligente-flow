
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Receipt,
  TrendingUp
} from "lucide-react";
import { useForm } from "react-hook-form";

interface Pagamento {
  id: string;
  mes: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: 'pendente' | 'pago' | 'atrasado';
  metodoPagamento?: string;
  numeroTransacao?: string;
}

interface PlanoPagamento {
  nome: string;
  valor: number;
  descricao: string;
  recursos: string[];
  ativo: boolean;
}

const Mensalidade = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pagamentos' | 'plano' | 'historico'>('dashboard');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const form = useForm();

  // Mock data
  const planoAtual: PlanoPagamento = {
    nome: "Plano Profissional",
    valor: 89.90,
    descricao: "Ideal para barbearias de médio porte",
    recursos: [
      "Até 3 profissionais",
      "Agendamentos ilimitados",
      "Relatórios avançados",
      "Suporte prioritário",
      "Backup automático"
    ],
    ativo: true
  };

  const pagamentos: Pagamento[] = [
    {
      id: "1",
      mes: "Junho 2024",
      valor: 89.90,
      dataVencimento: "2024-06-15",
      dataPagamento: "2024-06-14",
      status: "pago",
      metodoPagamento: "Cartão de Crédito",
      numeroTransacao: "TXN789123456"
    },
    {
      id: "2",
      mes: "Maio 2024",
      valor: 89.90,
      dataVencimento: "2024-05-15",
      dataPagamento: "2024-05-15",
      status: "pago",
      metodoPagamento: "PIX",
      numeroTransacao: "PIX456789123"
    },
    {
      id: "3",
      mes: "Abril 2024",
      valor: 89.90,
      dataVencimento: "2024-04-15",
      dataPagamento: "2024-04-18",
      status: "pago",
      metodoPagamento: "Boleto",
      numeroTransacao: "BOL123456789"
    },
    {
      id: "4",
      mes: "Julho 2024",
      valor: 89.90,
      dataVencimento: "2024-07-15",
      status: "pendente"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-600';
      case 'pendente':
        return 'bg-yellow-600';
      case 'atrasado':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pago':
        return <CheckCircle className="w-4 h-4" />;
      case 'pendente':
        return <Clock className="w-4 h-4" />;
      case 'atrasado':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const onSubmit = (data: any) => {
    console.log("Pagamento realizado:", data);
    setIsPaymentOpen(false);
    form.reset();
  };

  const proximoPagamento = pagamentos.find(p => p.status === 'pendente');
  const valorTotal2024 = pagamentos.filter(p => p.status === 'pago').reduce((sum, p) => sum + p.valor, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-barbershop-gold hover:text-barbershop-gold-light" />
              <div>
                <h1 className="text-2xl font-bold text-barbershop-gold">Mensalidade da Plataforma</h1>
                <p className="text-barbershop-gray-300 text-sm">Gerencie pagamentos e planos</p>
              </div>
            </div>
          </header>

          {/* Tabs */}
          <div className="bg-barbershop-gray-900 border-b border-barbershop-gray-700 px-6">
            <div className="flex space-x-8">
              {['dashboard', 'pagamentos', 'plano', 'historico'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-barbershop-gold text-barbershop-gold'
                      : 'border-transparent text-barbershop-gray-300 hover:text-barbershop-gold hover:border-barbershop-gray-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-6 bg-barbershop-gray-900">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Próximo Pagamento</p>
                          <p className="text-2xl font-bold text-barbershop-gold">
                            R$ {proximoPagamento?.valor.toFixed(2) || '0,00'}
                          </p>
                          <p className="text-barbershop-gray-400 text-xs">
                            Vence em {proximoPagamento ? new Date(proximoPagamento.dataVencimento).toLocaleDateString('pt-BR') : '-'}
                          </p>
                        </div>
                        <Calendar className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Gasto Total 2024</p>
                          <p className="text-2xl font-bold text-barbershop-gold">R$ {valorTotal2024.toFixed(2)}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Status da Conta</p>
                          <p className="text-2xl font-bold text-green-400">Ativa</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Próximo Pagamento */}
                {proximoPagamento && (
                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardHeader>
                      <CardTitle className="text-barbershop-gold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Pagamento Pendente
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{proximoPagamento.mes}</h3>
                          <p className="text-barbershop-gray-300">Vencimento: {new Date(proximoPagamento.dataVencimento).toLocaleDateString('pt-BR')}</p>
                          <p className="text-2xl font-bold text-barbershop-gold mt-2">R$ {proximoPagamento.valor.toFixed(2)}</p>
                        </div>
                        <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                          <DialogTrigger asChild>
                            <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                              <CreditCard className="w-4 h-4 mr-2" />
                              Pagar Agora
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-barbershop-gray-800 border-barbershop-gray-700">
                            <DialogHeader>
                              <DialogTitle className="text-barbershop-gold">Realizar Pagamento</DialogTitle>
                              <DialogDescription className="text-barbershop-gray-300">
                                Complete o pagamento da mensalidade da plataforma.
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                  <Label className="text-barbershop-gray-300">Valor a Pagar</Label>
                                  <div className="text-2xl font-bold text-barbershop-gold">
                                    R$ {proximoPagamento.valor.toFixed(2)}
                                  </div>
                                </div>
                                
                                <FormField
                                  control={form.control}
                                  name="metodoPagamento"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-barbershop-gray-300">Método de Pagamento</FormLabel>
                                      <FormControl>
                                        <select 
                                          {...field} 
                                          className="w-full p-2 bg-barbershop-gray-700 border border-barbershop-gray-600 text-white rounded"
                                        >
                                          <option value="">Selecione o método</option>
                                          <option value="cartao">Cartão de Crédito</option>
                                          <option value="pix">PIX</option>
                                          <option value="boleto">Boleto</option>
                                        </select>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <div className="flex justify-end space-x-2">
                                  <Button type="button" variant="outline" onClick={() => setIsPaymentOpen(false)}>
                                    Cancelar
                                  </Button>
                                  <Button type="submit" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                                    Confirmar Pagamento
                                  </Button>
                                </div>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Plano Atual */}
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold">Plano Atual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white">{planoAtual.nome}</h3>
                        <p className="text-barbershop-gray-300 mb-4">{planoAtual.descricao}</p>
                        <div className="text-2xl font-bold text-barbershop-gold mb-4">
                          R$ {planoAtual.valor.toFixed(2)}<span className="text-sm text-barbershop-gray-300">/mês</span>
                        </div>
                        <ul className="space-y-2">
                          {planoAtual.recursos.map((recurso, index) => (
                            <li key={index} className="text-barbershop-gray-300 flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                              {recurso}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Badge className="bg-green-600 text-white">
                        Ativo
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'pagamentos' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-barbershop-gold">Pagamentos Pendentes</h2>
                </div>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-barbershop-gray-600">
                          <TableHead className="text-barbershop-gray-300">Mês</TableHead>
                          <TableHead className="text-barbershop-gray-300">Valor</TableHead>
                          <TableHead className="text-barbershop-gray-300">Vencimento</TableHead>
                          <TableHead className="text-barbershop-gray-300">Status</TableHead>
                          <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pagamentos.filter(p => p.status === 'pendente').map((pagamento) => (
                          <TableRow key={pagamento.id} className="border-barbershop-gray-600">
                            <TableCell className="text-white">{pagamento.mes}</TableCell>
                            <TableCell className="text-white">R$ {pagamento.valor.toFixed(2)}</TableCell>
                            <TableCell className="text-white">
                              {new Date(pagamento.dataVencimento).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(pagamento.status)} text-white flex items-center gap-1 w-fit`}>
                                {getStatusIcon(pagamento.status)}
                                {pagamento.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                                <CreditCard className="w-4 h-4 mr-1" />
                                Pagar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'plano' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-barbershop-gold">Detalhes do Plano</h2>
                
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold">{planoAtual.nome}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-barbershop-gray-300">{planoAtual.descricao}</p>
                      <div className="text-3xl font-bold text-barbershop-gold">
                        R$ {planoAtual.valor.toFixed(2)}<span className="text-lg text-barbershop-gray-300">/mês</span>
                      </div>
                      
                      <div>
                        <h4 className="text-barbershop-gold font-medium mb-3">Recursos Inclusos:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {planoAtual.recursos.map((recurso, index) => (
                            <li key={index} className="text-barbershop-gray-300 flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                              {recurso}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-barbershop-gray-600">
                        <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                          Alterar Plano
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'historico' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-barbershop-gold">Histórico de Pagamentos</h2>
                  <Button variant="outline" className="border-barbershop-gold text-barbershop-gold">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-barbershop-gray-600">
                          <TableHead className="text-barbershop-gray-300">Mês</TableHead>
                          <TableHead className="text-barbershop-gray-300">Valor</TableHead>
                          <TableHead className="text-barbershop-gray-300">Data Pagamento</TableHead>
                          <TableHead className="text-barbershop-gray-300">Método</TableHead>
                          <TableHead className="text-barbershop-gray-300">Status</TableHead>
                          <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pagamentos.map((pagamento) => (
                          <TableRow key={pagamento.id} className="border-barbershop-gray-600">
                            <TableCell className="text-white">{pagamento.mes}</TableCell>
                            <TableCell className="text-white">R$ {pagamento.valor.toFixed(2)}</TableCell>
                            <TableCell className="text-white">
                              {pagamento.dataPagamento 
                                ? new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR')
                                : '-'
                              }
                            </TableCell>
                            <TableCell className="text-white">{pagamento.metodoPagamento || '-'}</TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(pagamento.status)} text-white flex items-center gap-1 w-fit`}>
                                {getStatusIcon(pagamento.status)}
                                {pagamento.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {pagamento.status === 'pago' && (
                                <Button variant="outline" size="sm" className="text-barbershop-gold border-barbershop-gold">
                                  <Receipt className="w-4 h-4 mr-1" />
                                  Recibo
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Mensalidade;
