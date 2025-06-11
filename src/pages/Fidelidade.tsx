
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  Star, 
  Gift, 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Settings,
  TrendingUp,
  Users,
  Award
} from "lucide-react";
import { useForm } from "react-hook-form";

interface Recompensa {
  id: string;
  nome: string;
  pontosNecessarios: number;
  tipo: 'desconto_percentual' | 'desconto_valor' | 'servico_gratuito';
  valor: number;
  descricao: string;
  validade: number;
  limitePorCliente: number;
  ativa: boolean;
}

interface HistoricoCliente {
  id: string;
  cliente: string;
  data: string;
  tipo: 'ganho' | 'resgate';
  pontos: number;
  descricao: string;
  saldoAtual: number;
}

const Fidelidade = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'configuracoes' | 'recompensas' | 'historico'>('dashboard');
  const [isNewRewardOpen, setIsNewRewardOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [programaAtivo, setProgramaAtivo] = useState(true);
  const [pontosPorReal, setPontosPorReal] = useState(1);
  const [validadePontos, setValidadePontos] = useState(12);

  const form = useForm();

  // Mock data
  const recompensas: Recompensa[] = [
    {
      id: "1",
      nome: "Corte Gratuito",
      pontosNecessarios: 100,
      tipo: "servico_gratuito",
      valor: 0,
      descricao: "Um corte de cabelo gratuito",
      validade: 90,
      limitePorCliente: 1,
      ativa: true
    },
    {
      id: "2",
      nome: "Desconto 20%",
      pontosNecessarios: 50,
      tipo: "desconto_percentual",
      valor: 20,
      descricao: "20% de desconto em qualquer serviço",
      validade: 30,
      limitePorCliente: 2,
      ativa: true
    },
    {
      id: "3",
      nome: "R$ 15 OFF",
      pontosNecessarios: 75,
      tipo: "desconto_valor",
      valor: 15,
      descricao: "R$ 15 de desconto em serviços",
      validade: 60,
      limitePorCliente: 1,
      ativa: false
    }
  ];

  const historico: HistoricoCliente[] = [
    {
      id: "1",
      cliente: "João Silva",
      data: "2024-06-10",
      tipo: "ganho",
      pontos: 35,
      descricao: "Pagamento - Corte + Barba",
      saldoAtual: 85
    },
    {
      id: "2",
      cliente: "Maria Santos",
      data: "2024-06-09",
      tipo: "resgate",
      pontos: -50,
      descricao: "Resgate - Desconto 20%",
      saldoAtual: 25
    },
    {
      id: "3",
      cliente: "Pedro Costa",
      data: "2024-06-08",
      tipo: "ganho",
      pontos: 25,
      descricao: "Pagamento - Corte Masculino",
      saldoAtual: 45
    }
  ];

  const getTipoRecompensaText = (tipo: string, valor: number) => {
    switch (tipo) {
      case 'desconto_percentual':
        return `${valor}% OFF`;
      case 'desconto_valor':
        return `R$ ${valor} OFF`;
      case 'servico_gratuito':
        return 'Serviço Gratuito';
      default:
        return tipo;
    }
  };

  const filteredHistorico = historico.filter(item =>
    item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: any) => {
    console.log("Nova recompensa:", data);
    setIsNewRewardOpen(false);
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
                <h1 className="text-2xl font-bold text-barbershop-gold">Programa de Fidelidade</h1>
                <p className="text-barbershop-gray-300 text-sm">Gerencie pontos e recompensas</p>
              </div>
            </div>
          </header>

          {/* Tabs */}
          <div className="bg-barbershop-gray-900 border-b border-barbershop-gray-700 px-6">
            <div className="flex space-x-8">
              {['dashboard', 'configuracoes', 'recompensas', 'historico'].map((tab) => (
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
                          <p className="text-barbershop-gray-300 text-sm">Pontos em Circulação</p>
                          <p className="text-2xl font-bold text-barbershop-gold">3.247</p>
                        </div>
                        <Star className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Clientes Ativos</p>
                          <p className="text-2xl font-bold text-barbershop-gold">89</p>
                        </div>
                        <Users className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Resgates Este Mês</p>
                          <p className="text-2xl font-bold text-barbershop-gold">23</p>
                        </div>
                        <Gift className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-barbershop-gray-300 text-sm">Taxa de Engajamento</p>
                          <p className="text-2xl font-bold text-barbershop-gold">67%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-barbershop-gold" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recompensas Populares */}
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold">Recompensas Mais Populares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recompensas.filter(r => r.ativa).map((recompensa) => (
                        <div key={recompensa.id} className="flex items-center justify-between p-4 bg-barbershop-gray-700 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Award className="w-6 h-6 text-barbershop-gold" />
                            <div>
                              <h4 className="text-barbershop-gold font-medium">{recompensa.nome}</h4>
                              <p className="text-barbershop-gray-300 text-sm">{recompensa.pontosNecessarios} pontos</p>
                            </div>
                          </div>
                          <Badge className="bg-barbershop-gold text-barbershop-black">
                            {getTipoRecompensaText(recompensa.tipo, recompensa.valor)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'configuracoes' && (
              <div className="space-y-6">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardHeader>
                    <CardTitle className="text-barbershop-gold flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Configurações do Programa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-barbershop-gray-200 text-base">Programa Ativo</Label>
                        <p className="text-barbershop-gray-400 text-sm">Ative ou desative o programa de fidelidade</p>
                      </div>
                      <Switch
                        checked={programaAtivo}
                        onCheckedChange={setProgramaAtivo}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-barbershop-gray-200">Pontos por Real Gasto</Label>
                      <Input
                        type="number"
                        value={pontosPorReal}
                        onChange={(e) => setPontosPorReal(Number(e.target.value))}
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white max-w-xs"
                      />
                      <p className="text-barbershop-gray-400 text-sm">Quantos pontos o cliente ganha por cada R$ 1,00 gasto</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-barbershop-gray-200">Validade dos Pontos (meses)</Label>
                      <Input
                        type="number"
                        value={validadePontos}
                        onChange={(e) => setValidadePontos(Number(e.target.value))}
                        className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white max-w-xs"
                      />
                      <p className="text-barbershop-gray-400 text-sm">Após quantos meses os pontos expiram</p>
                    </div>

                    <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'recompensas' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-barbershop-gold">Gerenciar Recompensas</h2>
                  <Dialog open={isNewRewardOpen} onOpenChange={setIsNewRewardOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Recompensa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-barbershop-gray-800 border-barbershop-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-barbershop-gold">Criar Nova Recompensa</DialogTitle>
                        <DialogDescription className="text-barbershop-gray-300">
                          Configure uma nova recompensa para o programa de fidelidade.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-barbershop-gray-300">Nome da Recompensa</FormLabel>
                                <FormControl>
                                  <Input {...field} className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="pontosNecessarios"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-barbershop-gray-300">Pontos Necessários</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsNewRewardOpen(false)}>
                              Cancelar
                            </Button>
                            <Button type="submit" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                              Criar Recompensa
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
                          <TableHead className="text-barbershop-gray-300">Pontos</TableHead>
                          <TableHead className="text-barbershop-gray-300">Tipo</TableHead>
                          <TableHead className="text-barbershop-gray-300">Validade</TableHead>
                          <TableHead className="text-barbershop-gray-300">Status</TableHead>
                          <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recompensas.map((recompensa) => (
                          <TableRow key={recompensa.id} className="border-barbershop-gray-600">
                            <TableCell className="text-white">{recompensa.nome}</TableCell>
                            <TableCell className="text-white">{recompensa.pontosNecessarios}</TableCell>
                            <TableCell className="text-white">
                              {getTipoRecompensaText(recompensa.tipo, recompensa.valor)}
                            </TableCell>
                            <TableCell className="text-white">{recompensa.validade} dias</TableCell>
                            <TableCell>
                              <Badge variant={recompensa.ativa ? "default" : "secondary"}>
                                {recompensa.ativa ? "Ativa" : "Inativa"}
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

            {activeTab === 'historico' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-barbershop-gold">Histórico de Pontos</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-barbershop-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar por cliente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                    />
                  </div>
                </div>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-barbershop-gray-600">
                          <TableHead className="text-barbershop-gray-300">Data</TableHead>
                          <TableHead className="text-barbershop-gray-300">Cliente</TableHead>
                          <TableHead className="text-barbershop-gray-300">Tipo</TableHead>
                          <TableHead className="text-barbershop-gray-300">Pontos</TableHead>
                          <TableHead className="text-barbershop-gray-300">Descrição</TableHead>
                          <TableHead className="text-barbershop-gray-300">Saldo Atual</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHistorico.map((item) => (
                          <TableRow key={item.id} className="border-barbershop-gray-600">
                            <TableCell className="text-white">
                              {new Date(item.data).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-white">{item.cliente}</TableCell>
                            <TableCell>
                              <Badge className={item.tipo === 'ganho' ? 'bg-green-600' : 'bg-red-600'}>
                                {item.tipo === 'ganho' ? 'Ganho' : 'Resgate'}
                              </Badge>
                            </TableCell>
                            <TableCell className={`font-medium ${item.tipo === 'ganho' ? 'text-green-400' : 'text-red-400'}`}>
                              {item.tipo === 'ganho' ? '+' : ''}{item.pontos}
                            </TableCell>
                            <TableCell className="text-barbershop-gray-300">{item.descricao}</TableCell>
                            <TableCell className="text-barbershop-gold font-medium">{item.saldoAtual}</TableCell>
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

export default Fidelidade;
