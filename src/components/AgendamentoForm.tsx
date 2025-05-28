
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Scissors, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const servicos = [
  { id: "1", nome: "Corte Masculino", preco: "R$ 35,00", duracao: "30 min" },
  { id: "2", nome: "Barba", preco: "R$ 25,00", duracao: "20 min" },
  { id: "3", nome: "Corte + Barba", preco: "R$ 55,00", duracao: "45 min" },
  { id: "4", nome: "Bigode", preco: "R$ 15,00", duracao: "15 min" },
  { id: "5", nome: "Sobrancelha", preco: "R$ 20,00", duracao: "15 min" },
];

const profissionais = [
  { id: "1", nome: "João Silva", especialidade: "Cortes clássicos" },
  { id: "2", nome: "Pedro Santos", especialidade: "Barbas e bigodes" },
  { id: "3", nome: "Carlos Oliveira", especialidade: "Cortes modernos" },
];

const horarios = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30"
];

export function AgendamentoForm() {
  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState<Date>();
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [dadosCliente, setDadosCliente] = useState({
    nome: "",
    telefone: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!servicoSelecionado || !profissionalSelecionado || !dataSelecionada || !horarioSelecionado || !dadosCliente.nome || !dadosCliente.telefone) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Agendamento realizado:", {
      servico: servicoSelecionado,
      profissional: profissionalSelecionado,
      data: dataSelecionada,
      horario: horarioSelecionado,
      cliente: dadosCliente
    });

    alert("Agendamento realizado com sucesso!");
  };

  const servicoInfo = servicos.find(s => s.id === servicoSelecionado);
  const profissionalInfo = profissionais.find(p => p.id === profissionalSelecionado);

  return (
    <div className="space-y-6">
      <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
        <CardHeader>
          <CardTitle className="text-barbershop-gold flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Novo Agendamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados do Cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-barbershop-gray-200">Nome *</Label>
                <Input
                  id="nome"
                  value={dadosCliente.nome}
                  onChange={(e) => setDadosCliente(prev => ({ ...prev, nome: e.target.value }))}
                  className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-barbershop-gray-200">Telefone *</Label>
                <Input
                  id="telefone"
                  value={dadosCliente.telefone}
                  onChange={(e) => setDadosCliente(prev => ({ ...prev, telefone: e.target.value }))}
                  className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-barbershop-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                value={dadosCliente.email}
                onChange={(e) => setDadosCliente(prev => ({ ...prev, email: e.target.value }))}
                className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                placeholder="seu@email.com"
              />
            </div>

            {/* Seleção de Serviço */}
            <div className="space-y-2">
              <Label className="text-barbershop-gray-200">Serviço *</Label>
              <Select value={servicoSelecionado} onValueChange={setServicoSelecionado}>
                <SelectTrigger className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white">
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent className="bg-barbershop-gray-700 border-barbershop-gray-600">
                  {servicos.map((servico) => (
                    <SelectItem key={servico.id} value={servico.id} className="text-white hover:bg-barbershop-gray-600">
                      <div className="flex justify-between w-full">
                        <span>{servico.nome}</span>
                        <span className="text-barbershop-gold ml-4">{servico.preco}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {servicoInfo && (
                <p className="text-barbershop-gray-400 text-sm">
                  Duração: {servicoInfo.duracao} - {servicoInfo.preco}
                </p>
              )}
            </div>

            {/* Seleção de Profissional */}
            <div className="space-y-2">
              <Label className="text-barbershop-gray-200">Profissional *</Label>
              <Select value={profissionalSelecionado} onValueChange={setProfissionalSelecionado}>
                <SelectTrigger className="bg-barbershop-gray-700 border-barbershop-gray-600 text-white">
                  <SelectValue placeholder="Selecione um profissional" />
                </SelectTrigger>
                <SelectContent className="bg-barbershop-gray-700 border-barbershop-gray-600">
                  {profissionais.map((profissional) => (
                    <SelectItem key={profissional.id} value={profissional.id} className="text-white hover:bg-barbershop-gray-600">
                      <div>
                        <div className="font-medium">{profissional.nome}</div>
                        <div className="text-sm text-barbershop-gray-400">{profissional.especialidade}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {profissionalInfo && (
                <p className="text-barbershop-gray-400 text-sm">
                  Especialidade: {profissionalInfo.especialidade}
                </p>
              )}
            </div>

            {/* Seleção de Data */}
            <div className="space-y-2">
              <Label className="text-barbershop-gray-200">Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-barbershop-gray-700 border-barbershop-gray-600 text-white hover:bg-barbershop-gray-600",
                      !dataSelecionada && "text-barbershop-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataSelecionada ? format(dataSelecionada, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-barbershop-gray-700 border-barbershop-gray-600" align="start">
                  <Calendar
                    mode="single"
                    selected={dataSelecionada}
                    onSelect={setDataSelecionada}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    initialFocus
                    className="bg-barbershop-gray-700 text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Seleção de Horário */}
            <div className="space-y-2">
              <Label className="text-barbershop-gray-200">Horário *</Label>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {horarios.map((horario) => (
                  <Button
                    key={horario}
                    type="button"
                    variant={horarioSelecionado === horario ? "default" : "outline"}
                    className={cn(
                      "text-sm",
                      horarioSelecionado === horario
                        ? "bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark"
                        : "bg-barbershop-gray-700 border-barbershop-gray-600 text-white hover:bg-barbershop-gray-600"
                    )}
                    onClick={() => setHorarioSelecionado(horario)}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {horario}
                  </Button>
                ))}
              </div>
            </div>

            {/* Resumo do Agendamento */}
            {servicoSelecionado && profissionalSelecionado && dataSelecionada && horarioSelecionado && (
              <Card className="bg-barbershop-gray-700 border-barbershop-gray-600">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold text-lg">Resumo do Agendamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-barbershop-gray-200">
                    <Scissors className="w-4 h-4" />
                    <span>{servicoInfo?.nome} - {servicoInfo?.preco}</span>
                  </div>
                  <div className="flex items-center gap-2 text-barbershop-gray-200">
                    <User className="w-4 h-4" />
                    <span>{profissionalInfo?.nome}</span>
                  </div>
                  <div className="flex items-center gap-2 text-barbershop-gray-200">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{format(dataSelecionada, "PPP", { locale: ptBR })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-barbershop-gray-200">
                    <Clock className="w-4 h-4" />
                    <span>{horarioSelecionado}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              type="submit" 
              className="w-full bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark font-semibold"
            >
              Confirmar Agendamento
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
