
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";

export function RecentAppointments() {
  const appointments = [
    {
      id: 1,
      client: "João Silva",
      service: "Corte + Barba",
      time: "09:00",
      date: "Hoje",
      barber: "Carlos",
      status: "Confirmado",
      statusColor: "bg-green-500"
    },
    {
      id: 2,
      client: "Pedro Santos",
      service: "Corte Tradicional",
      time: "10:30",
      date: "Hoje", 
      barber: "Roberto",
      status: "Em Andamento",
      statusColor: "bg-blue-500"
    },
    {
      id: 3,
      client: "Lucas Oliveira",
      service: "Barba",
      time: "14:00",
      date: "Hoje",
      barber: "Carlos",
      status: "Pendente",
      statusColor: "bg-yellow-500"
    },
    {
      id: 4,
      client: "Marcos Costa",
      service: "Corte + Sobrancelha",
      time: "16:00",
      date: "Amanhã",
      barber: "Roberto",
      status: "Confirmado",
      statusColor: "bg-green-500"
    }
  ];

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-barbershop-gold flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Próximos Agendamentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-3 rounded-lg bg-barbershop-gray-900/50 hover:bg-barbershop-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-barbershop-gold text-barbershop-black font-semibold">
                    {appointment.client.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{appointment.client}</p>
                  <p className="text-barbershop-gray-400 text-sm">{appointment.service}</p>
                  <p className="text-barbershop-gray-500 text-xs">Com {appointment.barber}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-barbershop-gray-300 text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  {appointment.time}
                </div>
                <p className="text-barbershop-gray-400 text-xs mb-2">{appointment.date}</p>
                <Badge 
                  className={`${appointment.statusColor} text-white text-xs`}
                >
                  {appointment.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
