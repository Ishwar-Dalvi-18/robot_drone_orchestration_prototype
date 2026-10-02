import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useSimulationStore } from '../../store/useSimulationStore';
import { calculateAgentRisk } from '../../engine/riskModel';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export function RiskPage() {
  const { agents } = useSimulationStore();
  const relays = agents.filter(a => a.type === 'relay_drone');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-light text-dark tracking-wide">Risk & Feasibility</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Agent Risk Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(agent => {
              const risk = calculateAgentRisk(agent, relays);
              return (
                <div key={agent.id} className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-dark">{agent.id}</h4>
                      <p className="text-xs text-muted">{agent.name}</p>
                    </div>
                    {risk > 50 ? <AlertTriangle className="text-danger w-6 h-6" /> : <ShieldCheck className="text-success w-6 h-6" />}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-default font-medium">Composite Risk</span>
                      <span className={`font-bold ${risk > 50 ? 'text-danger' : risk > 20 ? 'text-warning' : 'text-success'}`}>{Math.round(risk)}/100</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${risk > 50 ? 'bg-danger' : risk > 20 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${risk}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
