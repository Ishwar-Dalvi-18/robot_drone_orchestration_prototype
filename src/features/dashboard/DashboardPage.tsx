import React, { useEffect } from 'react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useMissionStore } from '../../store/useMissionStore';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Users, Activity, ShieldAlert, Network, Play, Pause, RotateCcw } from 'lucide-react';
import { simulator } from '../../engine/simulator';

export function DashboardPage() {
  const { agents, isPlaying, tick } = useSimulationStore();
  const { currentMission } = useMissionStore();

  useEffect(() => {
    // Auto-load scenario on first visit if empty
    if (agents.length === 0) {
      simulator.loadScenario('primary');
    }
  }, [agents.length]);

  const activeAgents = agents.filter(a => a.status !== 'IDLE' && a.status !== 'OFFLINE' && a.status !== 'FAILED').length;
  
  const totalTasks = currentMission?.tasks.length || 1;
  const totalProgressSum = currentMission?.tasks.reduce((acc, task) => {
      if (task.status === 'COMPLETED') return acc + 100;
      if (task.status === 'IN_PROGRESS') return acc + (task.progress || 0);
      return acc;
  }, 0) || 0;
  
  const progress = Math.round(totalProgressSum / totalTasks);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-light text-dark tracking-wide">Mission Overview</h2>
        <div className="flex items-center gap-4">
          <div className="px-5 py-2.5 bg-surface rounded-full shadow-divi text-sm font-semibold text-primary border border-border">
            Tick: <span className="font-light text-dark ml-2">{tick}</span>
          </div>
          <button 
            onClick={() => isPlaying ? simulator.pause() : simulator.start()}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white shadow-divi hover:scale-105 hover:bg-blue-600 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>
          <button 
            onClick={() => simulator.loadScenario('primary')}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-surface text-default shadow-divi hover:scale-105 hover:text-primary transition-all"
            title="Reset Scenario"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <StatCard title="Active Agents" value={`${activeAgents} / ${agents.length}`} icon={<Users className="w-6 h-6" />} iconColorClass="bg-primary" />
        <StatCard title="Mission Progress" value={`${progress}%`} icon={<Activity className="w-6 h-6" />} iconColorClass="bg-warning" />
        <StatCard title="Feasibility Score" value={`${currentMission?.feasibilityScore || 100}%`} icon={<ShieldAlert className="w-6 h-6" />} iconColorClass="bg-success" />
        <StatCard title="Network Status" value="Nominal" icon={<Network className="w-6 h-6" />} iconColorClass="bg-info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fleet Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-border text-[11px] uppercase tracking-widest text-muted">
                    <th className="pb-4 font-semibold">Agent</th>
                    <th className="pb-4 font-semibold">Role</th>
                    <th className="pb-4 font-semibold">Status</th>
                    <th className="pb-4 font-semibold">Battery</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map(agent => (
                    <tr key={agent.id} className="border-b border-border last:border-0 hover:bg-[#1e1e24]/50 transition-colors">
                      <td className="py-4 font-semibold text-dark text-sm">{agent.name}</td>
                      <td className="py-4 text-default text-sm">{agent.role}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                          agent.status === 'IDLE' ? 'bg-border text-default' : 
                          agent.status === 'FAILED' ? 'bg-danger/10 text-danger' : 
                          'bg-primary/10 text-primary'
                        }`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full bg-border rounded-full h-2 max-w-[120px]">
                            <div className={`h-2 rounded-full transition-all duration-300 ${agent.battery < 20 ? 'bg-danger' : 'bg-success'}`} style={{ width: `${agent.battery}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-dark">{Math.round(agent.battery)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {agents.length === 0 && (
                     <tr>
                        <td colSpan={4} className="py-8 text-center text-muted text-sm">No agents loaded. Click reset to load primary scenario.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
               {useSimulationStore.getState().events.length > 0 ? [...useSimulationStore.getState().events].reverse().slice(0, 10).map(ev => (
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
  );
}
