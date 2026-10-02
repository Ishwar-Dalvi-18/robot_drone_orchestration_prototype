import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useMissionStore } from '../../store/useMissionStore';
import { FileText } from 'lucide-react';

export function DecisionLogPage() {
  const { decisionLogs } = useMissionStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-light text-dark tracking-wide">AI Decision Log</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Traceability & Rationale</CardTitle>
        </CardHeader>
        <CardContent>
          {decisionLogs.length === 0 ? (
            <div className="text-center py-12 text-muted italic">No AI decisions have been logged yet.</div>
          ) : (
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              {decisionLogs.map((log) => (
                <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
                    <FileText className="w-4 h-4" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow relative z-10">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-primary uppercase tracking-wider">Tick: {log.tick}</span>
                       <span className="text-xs font-bold text-muted bg-[#1e1e24] px-2 py-1 rounded">Confidence: {Math.round(log.confidence * 100)}%</span>
                    </div>
                    <h4 className="font-bold text-dark text-sm mb-2">{log.chosenAction}</h4>
                    <p className="text-xs text-default font-medium">Trigger: {log.triggerEvent}</p>
                    <div className="mt-3 p-3 bg-[#1e1e24] rounded-lg border border-border">
                      <p className="text-xs text-muted leading-relaxed">Rationale: {log.rationale}</p>
                    </div>
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
