import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useSimulationStore } from '../../store/useSimulationStore';
import { Battery, Wrench, Shield, Zap } from 'lucide-react';

export function FleetManagementPage() {
  const { agents } = useSimulationStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-light text-dark tracking-wide">Fleet Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map(agent => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{agent.name}</CardTitle>
                  <p className="text-xs font-semibold text-primary mt-1 uppercase tracking-wider">{agent.role}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded-md ${agent.status === 'IDLE' ? 'bg-border text-default' : 'bg-success/10 text-success'}`}>
                  {agent.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  <Battery className="w-4 h-4 text-muted" /> Battery
                </div>
                <span className={`text-sm font-bold ${agent.battery < 20 ? 'text-danger' : 'text-success'}`}>{Math.round(agent.battery)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  <Shield className="w-4 h-4 text-muted" /> Health
                </div>
                <span className="text-sm font-bold text-success">{agent.health}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  <Wrench className="w-4 h-4 text-muted" /> Capabilities
                </div>
                <span className="text-xs text-default text-right w-1/2 truncate" title={agent.capabilities.join(', ')}>
                  {agent.capabilities.join(', ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  <Zap className="w-4 h-4 text-muted" /> Comms Range
                </div>
                <span className="text-sm font-bold text-dark">{agent.commsRange}m</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {agents.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted italic">No agents active in current scenario.</div>
        )}
      </div>
    </div>
  );
}
