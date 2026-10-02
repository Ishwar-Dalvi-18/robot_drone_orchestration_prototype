import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useMissionStore } from '../../store/useMissionStore';

export function ReplanningPage() {
  const { escalations, resolveEscalation } = useMissionStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-light text-dark tracking-wide">Re-planning & Escalations</h2>
      <Card>
        <CardHeader>
          <CardTitle>Active Escalations</CardTitle>
        </CardHeader>
        <CardContent>
          {escalations.length === 0 ? (
            <div className="text-center py-12 text-muted italic">No active escalations requiring human intervention.</div>
          ) : (
            <div className="space-y-6">
              {escalations.filter(e => e.status === 'PENDING').map(esc => (
                <div key={esc.id} className="p-4 bg-danger/5 border border-danger/20 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-danger text-lg">Escalation Request: {esc.id}</h4>
                      <p className="text-sm font-medium text-dark mt-1">Context: {esc.context}</p>
                    </div>
                    <span className="text-xs font-bold text-muted">Tick: {esc.tick}</span>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-muted">Available Options</h5>
                    {esc.options.map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => resolveEscalation(esc.id, 'RESOLVED')}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${opt.aiRecommended ? 'border-primary/50 bg-primary/5 hover:bg-primary/10' : 'border-border bg-surface hover:bg-[#1e1e24]'}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-dark">{opt.description}</span>
                          {opt.aiRecommended && <span className="text-xs font-bold text-primary bg-surface px-2 py-1 rounded shadow-sm">AI Recommended</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
