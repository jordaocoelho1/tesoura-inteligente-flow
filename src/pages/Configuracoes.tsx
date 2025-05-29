
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield, Palette, Clock, MapPin, Phone, Mail } from "lucide-react";

const Configuracoes = () => {
  const [configuracoes, setConfiguracoes] = useState({
    // Dados da Empresa
    nomeEmpresa: "BarberPro",
    telefone: "(11) 99999-9999",
    email: "contato@barberpro.com",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    
    // Horário de Funcionamento
    horarioAbertura: "08:00",
    horarioFechamento: "18:00",
    funcionaSegunda: true,
    funcionaTerca: true,
    funcionaQuarta: true,
    funcionaQuinta: true,
    funcionaSexta: true,
    funcionaSabado: true,
    funcionaDomingo: false,
    
    // Notificações
    notificacaoEmail: true,
    notificacaoSMS: true,
    notificacaoWhatsApp: true,
    notificacaoAgendamento: true,
    notificacaoLembrete: true,
    
    // Sistema
    backupAutomatico: true,
    logAcessos: true,
    modoEscuro: true,
    idioma: "pt-BR"
  });

  const handleInputChange = (campo: string, valor: any) => {
    setConfiguracoes(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-barbershop-gold">Configurações</h1>
              <p className="text-barbershop-gray-300 text-sm">Personalize o sistema conforme suas necessidades</p>
            </div>
            <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
              <Settings className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </header>

          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="empresa" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 bg-barbershop-gray-800 border-barbershop-gray-700">
                  <TabsTrigger value="empresa" className="data-[state=active]:bg-barbershop-gold data-[state=active]:text-barbershop-black">
                    Empresa
                  </TabsTrigger>
                  <TabsTrigger value="horarios" className="data-[state=active]:bg-barbershop-gold data-[state=active]:text-barbershop-black">
                    Horários
                  </TabsTrigger>
                  <TabsTrigger value="notificacoes" className="data-[state=active]:bg-barbershop-gold data-[state=active]:text-barbershop-black">
                    Notificações
                  </TabsTrigger>
                  <TabsTrigger value="sistema" className="data-[state=active]:bg-barbershop-gold data-[state=active]:text-barbershop-black">
                    Sistema
                  </TabsTrigger>
                  <TabsTrigger value="seguranca" className="data-[state=active]:bg-barbershop-gold data-[state=active]:text-barbershop-black">
                    Segurança
                  </TabsTrigger>
                </TabsList>

                {/* Dados da Empresa */}
                <TabsContent value="empresa">
                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardHeader>
                      <CardTitle className="text-barbershop-gold flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Dados da Empresa
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="nomeEmpresa" className="text-barbershop-gray-200">Nome da Empresa</Label>
                          <Input
                            id="nomeEmpresa"
                            value={configuracoes.nomeEmpresa}
                            onChange={(e) => handleInputChange("nomeEmpresa", e.target.value)}
                            className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefone" className="text-barbershop-gray-200">Telefone</Label>
                          <Input
                            id="telefone"
                            value={configuracoes.telefone}
                            onChange={(e) => handleInputChange("telefone", e.target.value)}
                            className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-barbershop-gray-200">E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            value={configuracoes.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endereco" className="text-barbershop-gray-200">Endereço</Label>
                          <Input
                            id="endereco"
                            value={configuracoes.endereco}
                            onChange={(e) => handleInputChange("endereco", e.target.value)}
                            className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Horários de Funcionamento */}
                <TabsContent value="horarios">
                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardHeader>
                      <CardTitle className="text-barbershop-gold flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Horários de Funcionamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="horarioAbertura" className="text-barbershop-gray-200">Horário de Abertura</Label>
                          <Input
                            id="horarioAbertura"
                            type="time"
                            value={configuracoes.horarioAbertura}
                            onChange={(e) => handleInputChange("horarioAbertura", e.target.value)}
                            className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="horarioFechamento" className="text-barbershop-gray-200">Horário de Fechamento</Label>
                          <Input
                            id="horarioFechamento"
                            type="time"
                            value={configuracoes.horarioFechamento}
                            onChange={(e) => handleInputChange("horarioFechamento", e.target.value)}
                            className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-barbershop-gold font-medium">Dias de Funcionamento</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { key: "funcionaSegunda", label: "Segunda" },
                            { key: "funcionaTerca", label: "Terça" },
                            { key: "funcionaQuarta", label: "Quarta" },
                            { key: "funcionaQuinta", label: "Quinta" },
                            { key: "funcionaSexta", label: "Sexta" },
                            { key: "funcionaSabado", label: "Sábado" },
                            { key: "funcionaDomingo", label: "Domingo" }
                          ].map((dia) => (
                            <div key={dia.key} className="flex items-center space-x-2">
                              <Switch
                                id={dia.key}
                                checked={configuracoes[dia.key as keyof typeof configuracoes] as boolean}
                                onCheckedChange={(checked) => handleInputChange(dia.key, checked)}
                              />
                              <Label htmlFor={dia.key} className="text-barbershop-gray-200">
                                {dia.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notificações */}
                <TabsContent value="notificacoes">
                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardHeader>
                      <CardTitle className="text-barbershop-gold flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Preferências de Notificação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-barbershop-gold font-medium">Canais de Comunicação</h3>
                        <div className="space-y-4">
                          {[
                            { key: "notificacaoEmail", label: "E-mail", icon: Mail },
                            { key: "notificacaoSMS", label: "SMS", icon: Phone },
                            { key: "notificacaoWhatsApp", label: "WhatsApp", icon: Phone },
                          ].map((canal) => (
                            <div key={canal.key} className="flex items-center justify-between p-3 bg-barbershop-gray-900 rounded-lg">
                              <div className="flex items-center gap-3">
                                <canal.icon className="w-5 h-5 text-barbershop-gold" />
                                <Label htmlFor={canal.key} className="text-barbershop-gray-200">
                                  {canal.label}
                                </Label>
                              </div>
                              <Switch
                                id={canal.key}
                                checked={configuracoes[canal.key as keyof typeof configuracoes] as boolean}
                                onCheckedChange={(checked) => handleInputChange(canal.key, checked)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-barbershop-gold font-medium">Tipos de Notificação</h3>
                        <div className="space-y-4">
                          {[
                            { key: "notificacaoAgendamento", label: "Novos agendamentos" },
                            { key: "notificacaoLembrete", label: "Lembretes de consulta" },
                          ].map((tipo) => (
                            <div key={tipo.key} className="flex items-center justify-between p-3 bg-barbershop-gray-900 rounded-lg">
                              <Label htmlFor={tipo.key} className="text-barbershop-gray-200">
                                {tipo.label}
                              </Label>
                              <Switch
                                id={tipo.key}
                                checked={configuracoes[tipo.key as keyof typeof configuracoes] as boolean}
                                onCheckedChange={(checked) => handleInputChange(tipo.key, checked)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Sistema */}
                <TabsContent value="sistema">
                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardHeader>
                      <CardTitle className="text-barbershop-gold flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Configurações do Sistema
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        {[
                          { key: "backupAutomatico", label: "Backup automático diário" },
                          { key: "logAcessos", label: "Registrar logs de acesso" },
                          { key: "modoEscuro", label: "Modo escuro (ativado)" },
                        ].map((config) => (
                          <div key={config.key} className="flex items-center justify-between p-3 bg-barbershop-gray-900 rounded-lg">
                            <Label htmlFor={config.key} className="text-barbershop-gray-200">
                              {config.label}
                            </Label>
                            <Switch
                              id={config.key}
                              checked={configuracoes[config.key as keyof typeof configuracoes] as boolean}
                              onCheckedChange={(checked) => handleInputChange(config.key, checked)}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Segurança */}
                <TabsContent value="seguranca">
                  <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                    <CardHeader>
                      <CardTitle className="text-barbershop-gold flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Segurança e Privacidade
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-barbershop-gray-900 rounded-lg">
                          <h3 className="text-barbershop-gold font-medium mb-2">Alterar Senha</h3>
                          <div className="space-y-3">
                            <Input
                              type="password"
                              placeholder="Senha atual"
                              className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                            />
                            <Input
                              type="password"
                              placeholder="Nova senha"
                              className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                            />
                            <Input
                              type="password"
                              placeholder="Confirmar nova senha"
                              className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                            />
                            <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                              Alterar Senha
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-barbershop-gray-900 rounded-lg">
                          <h3 className="text-barbershop-gold font-medium mb-2">Autenticação em Duas Etapas</h3>
                          <p className="text-barbershop-gray-400 text-sm mb-3">
                            Adicione uma camada extra de segurança à sua conta
                          </p>
                          <Button variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                            Configurar 2FA
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Configuracoes;
