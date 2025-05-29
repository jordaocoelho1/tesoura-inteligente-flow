
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, AlertTriangle, Users, Package, DollarSign, Check, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const notificacoesData = [
  {
    id: "1",
    tipo: "Agendamento",
    titulo: "Novo agendamento",
    mensagem: "Carlos Oliveira agendou um corte + barba para hoje às 14:00",
    data: new Date(2025, 0, 29, 13, 30),
    lida: false,
    prioridade: "Alta"
  },
  {
    id: "2",
    tipo: "Estoque",
    titulo: "Estoque baixo",
    mensagem: "Gel para cabelo está com estoque crítico (2 unidades)",
    data: new Date(2025, 0, 29, 12, 15),
    lida: false,
    prioridade: "Crítica"
  },
  {
    id: "3",
    tipo: "Financeiro",
    titulo: "Pagamento recebido",
    mensagem: "PIX de R$ 55,00 recebido de João Santos",
    data: new Date(2025, 0, 29, 11, 45),
    lida: true,
    prioridade: "Normal"
  },
  {
    id: "4",
    tipo: "Cliente",
    titulo: "Aniversário do cliente",
    mensagem: "Pedro Silva faz aniversário hoje! Envie uma mensagem especial",
    data: new Date(2025, 0, 29, 9, 0),
    lida: false,
    prioridade: "Normal"
  },
  {
    id: "5",
    tipo: "Sistema",
    titulo: "Backup concluído",
    mensagem: "Backup automático dos dados realizado com sucesso",
    data: new Date(2025, 0, 29, 2, 0),
    lida: true,
    prioridade: "Baixa"
  }
];

const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState(notificacoesData);
  const [filtroTipo, setFiltroTipo] = useState("Todas");

  const marcarComoLida = (id: string) => {
    setNotificacoes(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, lida: true } : notif
      )
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(prev =>
      prev.map(notif => ({ ...notif, lida: true }))
    );
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Agendamento":
        return <Calendar className="w-5 h-5" />;
      case "Estoque":
        return <Package className="w-5 h-5" />;
      case "Financeiro":
        return <DollarSign className="w-5 h-5" />;
      case "Cliente":
        return <Users className="w-5 h-5" />;
      case "Sistema":
        return <Bell className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Agendamento":
        return "bg-blue-600";
      case "Estoque":
        return "bg-orange-600";
      case "Financeiro":
        return "bg-green-600";
      case "Cliente":
        return "bg-purple-600";
      case "Sistema":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Crítica":
        return "bg-red-600";
      case "Alta":
        return "bg-orange-600";
      case "Normal":
        return "bg-blue-600";
      case "Baixa":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length;
  const notificacoesFiltradas = filtroTipo === "Todas" 
    ? notificacoes 
    : notificacoes.filter(n => n.tipo === filtroTipo);

  const tiposDisponiveis = ["Todas", ...new Set(notificacoes.map(n => n.tipo))];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-barbershop-gold">Notificações</h1>
              <p className="text-barbershop-gray-300 text-sm">
                {notificacoesNaoLidas} não lidas de {notificacoes.length} total
              </p>
            </div>
            <Button 
              onClick={marcarTodasComoLidas}
              className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark"
            >
              <Check className="w-4 h-4 mr-2" />
              Marcar Todas como Lidas
            </Button>
          </header>

          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Cards de Resumo */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Total</p>
                        <p className="text-2xl font-bold text-barbershop-gold">{notificacoes.length}</p>
                      </div>
                      <Bell className="w-8 h-8 text-barbershop-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Não Lidas</p>
                        <p className="text-2xl font-bold text-red-400">{notificacoesNaoLidas}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Hoje</p>
                        <p className="text-2xl font-bold text-blue-400">5</p>
                      </div>
                      <Calendar className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Críticas</p>
                        <p className="text-2xl font-bold text-orange-400">1</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-orange-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filtros */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <span className="text-barbershop-gray-200 font-medium">Filtrar por tipo:</span>
                    <div className="flex gap-2">
                      {tiposDisponiveis.map((tipo) => (
                        <Button
                          key={tipo}
                          size="sm"
                          variant={filtroTipo === tipo ? "default" : "outline"}
                          onClick={() => setFiltroTipo(tipo)}
                          className={filtroTipo === tipo 
                            ? "bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark" 
                            : "border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700"
                          }
                        >
                          {tipo}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Notificações */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold">
                    {filtroTipo === "Todas" ? "Todas as Notificações" : `Notificações - ${filtroTipo}`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notificacoesFiltradas.map((notificacao) => (
                      <div
                        key={notificacao.id}
                        className={`p-4 rounded-lg border transition-all ${
                          notificacao.lida 
                            ? "bg-barbershop-gray-900 border-barbershop-gray-600 opacity-75" 
                            : "bg-barbershop-gray-700 border-barbershop-gray-500"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTipoColor(notificacao.tipo)}`}>
                              {getTipoIcon(notificacao.tipo)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-medium ${notificacao.lida ? 'text-barbershop-gray-300' : 'text-barbershop-gold'}`}>
                                  {notificacao.titulo}
                                </h3>
                                <Badge className={`${getPrioridadeColor(notificacao.prioridade)} text-white text-xs`}>
                                  {notificacao.prioridade}
                                </Badge>
                              </div>
                              <p className="text-barbershop-gray-400 text-sm mb-2">
                                {notificacao.mensagem}
                              </p>
                              <p className="text-barbershop-gray-500 text-xs">
                                {format(notificacao.data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notificacao.lida && (
                              <div className="w-3 h-3 bg-barbershop-gold rounded-full" />
                            )}
                            {!notificacao.lida && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => marcarComoLida(notificacao.id)}
                                className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700"
                            >
                              <X className="w-4 h-4" />
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

export default Notificacoes;
