
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

export function RevenueChart() {
  const data = [
    { month: "Jan", revenue: 4500 },
    { month: "Fev", revenue: 5200 },
    { month: "Mar", revenue: 4800 },
    { month: "Abr", revenue: 6100 },
    { month: "Mai", revenue: 5800 },
    { month: "Jun", revenue: 6500 },
    { month: "Jul", revenue: 7200 },
    { month: "Ago", revenue: 6800 },
    { month: "Set", revenue: 7500 },
    { month: "Out", revenue: 8200 },
    { month: "Nov", revenue: 7800 },
    { month: "Dez", revenue: 9100 }
  ];

  return (
    <Card className="bg-barbershop-gray-800 border-barbershop-gray-700 animate-fade-in shadow-lg">
      <CardHeader>
        <CardTitle className="text-barbershop-gold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Receita Mensal (2024)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#525252" />
              <XAxis 
                dataKey="month" 
                stroke="#D4AF37"
                fontSize={12}
              />
              <YAxis 
                stroke="#D4AF37"
                fontSize={12}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#404040',
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value) => [`R$ ${value}`, 'Receita']}
              />
              <Bar 
                dataKey="revenue" 
                fill="url(#goldGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#B8941F" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
