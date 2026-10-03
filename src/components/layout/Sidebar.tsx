import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { 
  LayoutDashboard, 
  Map, 
  Radio, 
  Settings, 
  ShieldAlert, 
  FileText, 
  Users, 
  CheckSquare, 
  Activity, 
  Network
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Mission Planner', path: '/planner', icon: Map },
  { name: 'Live Operations', path: '/live', icon: Radio },
  { name: 'Fleet Management', path: '/fleet', icon: Users },
  { name: 'Task Board', path: '/tasks', icon: CheckSquare },
  { name: 'Re-planning Center', path: '/replanning', icon: Activity },
  { name: 'Communications', path: '/comms', icon: Network },
  { name: 'Risk & Feasibility', path: '/risk', icon: ShieldAlert },
  { name: 'Decision Log', path: '/decisions', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <nav className="fixed inset-y-0 left-0 z-50 w-64 bg-surface shadow-divi flex flex-col hidden md:flex transition-all duration-300 border-r border-border">
      <div className="flex items-center justify-center h-24">
        <h1 className="text-primary font-bold text-2xl tracking-widest uppercase">MOSAIC<span className="text-dark font-light"></span></h1>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar py-6">
        <ul className="space-y-2 px-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-[13px] uppercase tracking-wider rounded-md transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white font-semibold shadow-md" 
                    : "text-default hover:text-primary hover:bg-blue-50"
                )}
              >
                <item.icon className={cn("w-5 h-5 mr-4", "opacity-80")} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
