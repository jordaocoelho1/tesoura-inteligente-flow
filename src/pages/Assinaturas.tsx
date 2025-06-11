
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Users, 
  DollarSign, 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Crown,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useForm } from "react-hook-form";

interface Plano {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  periodo: string;
  beneficios: string[];
  ativo: boolean;
}

interface Assinante {
  id: string;
  cliente: string;
  email: string;
  plano: string;
  status: 'ativa' | 'pausada' | 'cancelada' | 'vencida';
  dataInicio: string;
  proximoVencimento: string;
  valorMensal: number;
}

const Assinaturas = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'planos' | 'assinantes'>('dashboard');
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm();

  // Mock data
  const planos: Plano[] = [
    {
      id: "1",
      nome: "Básico",
      descricao: "Plano essencial para clientes casuais",
      preco: 29.90,
      periodo: "mensal",
      beneficios: ["2 cortes por mês", "10% desconto em produtos", "Agendamento prioritário"],
      ativo: true
    },
    {
      id: "2",
      nome: "Premium",
      descricao: "Plano completo para clientes frequentes",
      preco: 59.90,
      periodo: "mensal",
      beneficios: ["4 cortes por mês", "20% desconto em produtos", "Lavagem gratuita", "Agendamento VIP"],
      ativo: true
    },
    {
      id: "3",
      nome: "VIP",
      descricao: "Plano exclusivo com todos os benefícios",
      preco: 99.90,
      periodo: "mensal",
      beneficios: ["Cortes ilimitados", "30% desconto em produtos", "Serviços premium", "Atendimento exclusivo"],
      ativo: true
    }
  ];

  const assinantes: Assinante[] = [
    {
      id: "1",
      cliente: "João Silva",
      email: "joao@email.com",
      plano: "Premium",
      status: "ativa",
      dataInicio: "2024-01-15",
      proximoVencimento: "2024-07-15",
      valorMensal: 59.90
    },
    {
      id: "2",
      cliente: "Maria Santos",
      email: "maria@email.com",
      plano: "VIP",
      status: "ativa",
      dataInicio: "2024-02-01",
      proximoVencimento: "2024-08-01",
      valorMensal: 99.90
    },
    {
      id: "3",
      cliente: "Pedro Costa",
      email: "pedro@email.com",
      plano: "Básico",
      status: "pausada",
      dataInicio: "2024-03-10",
      proximoVencimento: "2024-09-10",
      valorMensal: 29.90
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'bg-green-500';
      case 'pausada':
        return 'bg-yellow-500';
      case 'cancelada':
        return 'bg-red-500';
      case 'vencida':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredAssinantes = assinantes.filter(assinante =>
    assinante.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assinante.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assinante.plano.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: any) => {
    console.log("Novo plano:", data);
    setIsNewPlanOpen(false);
    form.reset();
  };

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
                <h1 className="text-2xl font-bold text-barbershop-gold">Assinaturas</h1>
                <p className="text-barbershop-gray-300 text-sm">Gerencie planos e assinantes</p>
              </div>
            </div>
          </header>

          {/* Tabs */}
          <div className="bg-barbershop-gray-900 border-b border-barbershop-gray-700 px-6">
            <div className="flex space-x-8">
              {['dashboard', 'planos', 'assinantes'].map((tab) => (
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Assinantes Ativos</p>
                          <p className="text-2xl font-bold text-barbershop-gold">157</p>
                        </div>
                        <Users className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Receita Mensal</p>
                          <p className="text-2xl font-bold text-barbershop-gold">R$ 8.420</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Taxa de Retenção</p>
                          <p className="text-2xl font-bold text-barbershop-gold">92%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Planos Ativos</p>
                          <p className="text-2xl font-bold text-barbershop-gold">{planos.filter(p => p.ativo).length}</p>
                        </div>
                        <Crown className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Planos Overview */}
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold">Planos Disponíveis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {planos.map((plano) => (
                        <div key={plano.id} className="bg-barbershop-gray-700 rounded-lg p-6 border border-barbershop-gray-600">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-barbershop-gold">{plano.nome}</h3>
                            <Badge variant={plano.ativo ? "default" : "secondary"}>
                              {plano.ativo ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>
                          <p className="text-barbershop-gray-300 text-sm mb-4">{plano.descricao}</p>
                          <div className="text-2xl font-bold text-barbershop-gold mb-4">
                            R$ {plano.preco.toFixed(2)}<span className="text-sm text-barbershop-gray-300">/{plano.periodo}</span>
                          </div>
                          <ul className="space-y-2">
                            {plano.beneficios.map((beneficio, index) => (
                              <li key={index} className="text-barbershop-gray-300 text-sm flex items-center">
                                <span className="w-2 h-2 bg-barbershop-gold rounded-full mr-2"></span>
                                {beneficio}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'planos' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-barbershop-gold">Gerenciar Planos</h2>
                  <Dialog open={isNewPlanOpen} onOpenChange={setIsNewPlanOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Plano
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-barbershop-gray-800 border-barbershop-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-barbershop-gold">Criar Novo Plano</DialogTitle>
                        <DialogDescription className="text-barbershop-gray-300">
                          Preencha as informações do novo plano de assinatura.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-barbershop-gray-300">Nome do Plano</FormLabel>
                                <FormControl>
                                  <Input {...field} className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="preco"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-barbershop-gray-300">Preço (R$)</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsNewPlanOpen(false)}>
                              Cancelar
                            </Button>
                            <Button type="submit" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                              Criar Plano
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-barbershop-gray-600">
                          <TableHead className="text-barbershop-gray-300">Nome</TableHead>
                          <TableHead className="text-barbershop-gray-300">Preço</TableHead>
                          <TableHead className="text-barbershop-gray-300">Período</TableHead>
                          <TableHead className="text-barbershop-gray-300">Status</TableHead>
                          <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {planos.map((plano) => (
                          <TableRow key={plano.id} className="border-barbershop-gray-600">
                            <TableCell className="text-white">{plano.nome}</TableCell>
                            <TableCell className="text-white">R$ {plano.preco.toFixed(2)}</TableCell>
                            <TableCell className="text-white">{plano.periodo}</TableCell>
                            <TableCell>
                              <Badge variant={plano.ativo ? "default" : "secondary"}>
                                {plano.ativo ? "Ativo" : "Inativo"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="text-barbershop-gold border-barbershop-gold">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-400 border-red-400">
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
              </div>
            )}

            {activeTab === 'assinantes' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-barbershop-gold">Assinantes</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-barbershop-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar assinante..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-barbershop-gray-600">
                          <TableHead className="text-barbershop-gray-300">Cliente</TableHead>
                          <TableHead className="text-barbershop-gray-300">Email</TableHead>
                          <TableHead className="text-barbershop-gray-300">Plano</TableHead>
                          <TableHead className="text-barbershop-gray-300">Status</TableHead>
                          <TableHead className="text-barbershop-gray-300">Próximo Vencimento</TableHead>
                          <TableHead className="text-barbershop-gray-300">Valor</TableHead>
                          <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAssinantes.map((assinante) => (
                          <TableRow key={assinante.id} className="border-barbershop-gray-600">
                            <TableCell className="text-white">{assinante.cliente}</TableCell>
                            <TableCell className="text-barbershop-gray-300">{assinante.email}</TableCell>
                            <TableCell className="text-white">{assinante.plano}</TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(assinante.status)} text-white`}>
                                {assinante.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-white">
                              {new Date(assinante.proximoVencimento).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-white">R$ {assinante.valorMensal.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="text-barbershop-gold border-barbershop-gold">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-barbershop-gray-300 border-barbershop-gray-600">
                                  <Calendar className="w-4 h-4" />
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
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Assinaturas;
