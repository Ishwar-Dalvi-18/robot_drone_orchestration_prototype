import React, { useEffect } from 'react';
import { MapCanvas } from '../../components/map/MapCanvas';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useSimulationStore } from '../../store/useSimulationStore';
import { simulator } from '../../engine/simulator';
import { Play, Pause } from 'lucide-react';

export function LiveOpsPage() {
  const { isPlaying, speedMultiplier, tick, agents, events } = useSimulationStore();
  
  useEffect(() => {
    if (agents.length === 0) {
      simulator.loadScenario('primary');
    }
  }, [agents.length]);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-semibold text-dark tracking-tight font-sans">Live Operations</h2>
        
        <div className="flex bg-surface rounded-2xl shadow-divi p-1.5 gap-1 items-center border border-border">
          <span className="text-sm font-semibold text-primary px-4 border-r border-border uppercase tracking-widest">Tick <span className="text-dark ml-2 bg-border px-2 py-1 rounded-md">{tick}</span></span>
          <button onClick={() => isPlaying ? simulator.pause() : simulator.start()} className="p-2 ml-2 hover:bg-blue-50 rounded-xl transition-all duration-300 text-primary shadow-sm hover:shadow-md">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          <div className="h-6 w-px bg-border mx-2"></div>
          {[1, 2, 5, 10].map(speed => (
             <button 
                key={speed}
                onClick={() => simulator.setSpeed(speed)} 
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-300 ${speedMultiplier === speed ? 'bg-primary text-white shadow-glow' : 'text-secondary hover:bg-border hover:text-dark'}`}
              >
                {speed}x
              </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
        <div className="lg:col-span-3 h-full relative group">
          <MapCanvas />
          {/* Overlay Status */}
          <div className="absolute top-4 left-4 glass-panel px-4 py-2 rounded-xl text-xs font-bold text-dark flex gap-3 items-center opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success animate-pulse-fast"></div> Tracking {agents.length} Agents</span>
          </div>
        </div>
        <div className="h-full flex flex-col gap-6 overflow-y-auto no-scrollbar pr-2 pb-4">
          <Card className="flex-shrink-0 shadow-soft border-0 bg-surface/60 backdrop-blur-md">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm uppercase tracking-widest text-secondary font-bold">Telemetry</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
               <div className="space-y-3">
                 {agents.map(agent => (
                   <div key={agent.id} className="p-3 bg-surface rounded-xl shadow-sm border border-border/50 hover:border-primary/30 transition-all hover:shadow-md group">
                     <div className="flex justify-between items-center mb-2">
                       <span className="font-bold text-xs text-dark group-hover:text-primary transition-colors">{agent.name}</span>
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${agent.battery < 20 ? 'bg-danger/10 text-danger animate-pulse-fast' : 'bg-primary/10 text-primary'}`}>{Math.round(agent.battery)}%</span>
                     </div>
                     <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                       <div className={`h-full rounded-full transition-all duration-1000 ease-out ${agent.battery < 20 ? 'bg-danger shadow-glow-danger' : 'bg-primary shadow-glow'}`} style={{ width: `${agent.battery}%` }}></div>
                     </div>
                     <div className="flex justify-between mt-2 text-[10px] text-muted font-medium">
                       <span>{agent.status}</span>
                       <span>{agent.speed} m/s</span>
                     </div>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 shadow-soft border-0 bg-surface/60 backdrop-blur-md flex flex-col min-h-[300px]">
             <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm uppercase tracking-widest text-secondary font-bold">Event Log</CardTitle>
             </CardHeader>
             <CardContent className="pt-4 flex-1 overflow-y-auto no-scrollbar">
                <div className="space-y-3">
                  {events.length > 0 ? [...events].reverse().map(ev => (
                    <div key={ev.id} className="p-3 bg-surface rounded-xl shadow-sm border-l-4 border-l-warning text-xs">
                       <div className="flex justify-between text-muted mb-1 font-semibold text-[10px]">
                         <span>Tick: {ev.tickTrigger}</span>
                         <span className="text-warning">{ev.type}</span>
                       </div>
                       <p className="text-dark font-medium leading-relaxed">{ev.description}</p>
                    </div>
                  )) : (
                    <div className="text-xs text-muted font-medium text-center pt-8 italic">
                      Monitoring feed...
                    </div>
                  )}
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
