import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useSimulationStore } from '../../store/useSimulationStore';
import { calculateCommsCoverage } from '../../engine/commsModel';
import { Network, WifiOff, Wifi } from 'lucide-react';

export function CommsPage() {
  const { agents } = useSimulationStore();
  const relays = agents.filter(a => a.type === 'relay_drone');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-light text-dark tracking-wide">Communications Topology</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Network Health</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {agents.map(agent => {
                  const signal = calculateCommsCoverage(agent, relays);
                  return (
                    <div key={agent.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        {signal > 50 ? <Wifi className="text-success w-5 h-5" /> : signal > 0 ? <Network className="text-warning w-5 h-5" /> : <WifiOff className="text-danger w-5 h-5" />}
                        <div>
                          <p className="font-semibold text-sm text-dark">{agent.name}</p>
                          <p className="text-xs text-muted">{agent.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-1/3">
                        <div className="w-full bg-border rounded-full h-2">
                          <div className={`h-2 rounded-full ${signal > 50 ? 'bg-success' : signal > 0 ? 'bg-warning' : 'bg-danger'}`} style={{ width: `${signal}%` }}></div>
                        </div>
                        <span className="text-xs font-bold min-w-[40px] text-right">{Math.round(signal)}%</span>
                      </div>
                    </div>
                  );
                })}
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relay Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            {relays.length === 0 ? (
              <p className="text-sm text-muted italic">No active relay nodes.</p>
            ) : (
              <div className="space-y-4">
                {relays.map(relay => (
                  <div key={relay.id} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-bold text-primary">{relay.name}</h4>
                    <p className="text-xs text-dark mt-1">Range: {relay.commsRange}m</p>
                    <p className="text-xs text-dark mt-1">Status: {relay.status}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
