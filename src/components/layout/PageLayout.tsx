import React from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-body flex font-sans">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col relative min-h-screen">
        <TopHeader />
        <main className="flex-1 p-8 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
}
