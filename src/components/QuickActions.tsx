
import { Calendar, Users, Scissors, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  const actions = [
    {
      icon: Calendar,
      title: "Novo Agendamento",
      description: "Agendar um novo cliente",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: Users,
      title: "Cadastrar Cliente",
      description: "Adicionar novo cliente",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: Scissors,
      title: "Adicionar Serviço",
      description: "Novo serviço disponível",
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      icon: DollarSign,
      title: "Registrar Venda",
      description: "Lançar receita",
      color: "bg-barbershop-gold hover:bg-barbershop-gold-dark text-barbershop-black"
    }
  ];

  return (
    <Card className="bg-barbershop-gray-800 border-barbershop-gray-700 animate-fade-in shadow-lg">
      <CardHeader>
        <CardTitle className="text-barbershop-gold flex items-center gap-2">
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`${action.color} border-0 text-white h-16 flex-col gap-1 hover:scale-105 transition-all duration-200 shadow-md`}
            >
              <action.icon className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold text-sm">{action.title}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
