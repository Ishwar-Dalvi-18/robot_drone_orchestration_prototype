import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("bg-surface rounded-xl shadow-soft border border-border/50 transition-all duration-300 hover:shadow-lg", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-surface rounded-t-xl", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3 className={cn("mb-0 text-dark font-semibold text-[1.1rem]", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardOvertitle({ className, children, ...props }: CardProps) {
  return (
    <h6 className={cn("uppercase text-muted text-[0.65rem] font-bold tracking-[0.1em] mb-2", className)} {...props}>
      {children}
    </h6>
  );
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("p-8", className)} {...props}>
      {children}
    </div>
  );
}
