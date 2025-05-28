
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export function StatCard({ title, value, icon: Icon, trend, description }: StatCardProps) {
  return (
    <Card className="glass-card hover:scale-105 transition-all duration-300 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-barbershop-gray-100 text-sm font-medium mb-1">
              {title}
            </p>
            <p className="text-3xl font-bold text-white mb-2">
              {value}
            </p>
            {description && (
              <p className="text-barbershop-gray-300 text-xs">
                {description}
              </p>
            )}
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="text-barbershop-gray-400 text-sm ml-1">
                  vs. mês anterior
                </span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-barbershop-black" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
