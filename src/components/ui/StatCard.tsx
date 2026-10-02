import React from 'react';
import { Card, CardContent, CardOvertitle } from './Card';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColorClass?: string;
  trendText?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon, iconColorClass = "bg-primary", trendText, trendUp }: StatCardProps) {
  return (
    <Card className="mb-4 xl:mb-0 border-none group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardOvertitle className="text-muted font-bold tracking-wider mb-2">{title}</CardOvertitle>
            <span className="font-light text-4xl text-dark group-hover:text-primary transition-colors">{value}</span>
          </div>
          <div>
            <div className={cn("text-white rounded-xl w-14 h-14 flex items-center justify-center shadow-divi transition-transform group-hover:scale-110", iconColorClass)}>
              {icon}
            </div>
          </div>
        </div>
        {trendText && (
          <p className="mt-6 mb-0 text-[13px] font-semibold border-t border-gray-50 pt-3">
            <span className={cn("mr-2", trendUp ? "text-success" : "text-danger")}>
              {trendUp ? '↑' : '↓'} {trendText.split(' ')[0]}
            </span>
            <span className="text-muted font-normal">{trendText.split(' ').slice(1).join(' ')}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
