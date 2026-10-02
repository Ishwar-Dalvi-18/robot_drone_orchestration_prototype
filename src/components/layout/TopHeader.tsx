import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export function TopHeader() {
  return (
    <nav className="absolute top-0 left-0 w-full z-10 bg-surface/80 backdrop-blur-md shadow-sm flex items-center justify-between px-8 py-4">
      <div className="text-dark font-bold text-sm uppercase tracking-widest">
        Dashboard
      </div>
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted" />
          </div>
          <input 
            type="text" 
            className="block w-64 pl-10 pr-3 py-2 border border-border rounded-full leading-5 bg-[#1e1e24] text-dark placeholder-muted focus:outline-none focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all" 
            placeholder="Search module..." 
          />
        </div>
        <div className="flex items-center gap-4 text-default">
          <button className="hover:text-primary transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger ring-2 ring-white"></span>
          </button>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            <div className="w-9 h-9 rounded-full bg-border border border-border flex items-center justify-center">
              <User className="w-5 h-5 text-default" />
            </div>
            <span className="text-sm font-semibold hidden md:block text-dark">Commander</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
