import React from 'react';
import { useMissionStore } from '../../store/useMissionStore';

export function TaskBoardPage() {
  const { currentMission } = useMissionStore();
  const tasks = currentMission?.tasks || [];

  const columns = [
    { id: 'PENDING', title: 'Pending' },
    { id: 'ASSIGNED', title: 'Assigned' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
    { id: 'COMPLETED', title: 'Completed' },
    { id: 'FAILED', title: 'Failed' },
  ];

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] flex flex-col animate-in fade-in duration-500">
      <h2 className="text-3xl font-light text-dark tracking-wide">Task Board</h2>
      
      <div className="flex-1 flex gap-6 overflow-x-auto no-scrollbar pb-4">
        {columns.map(col => (
          <div key={col.id} className="flex-1 min-w-[280px] bg-[#1e1e24]/50 rounded-xl border border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-dark">{col.title}</h3>
              <span className="text-xs font-bold text-muted">{tasks.filter(t => t.status === col.id).length} tasks</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto no-scrollbar space-y-3">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div key={task.id} className="bg-surface p-3 rounded-lg shadow-sm border border-border hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary">{task.id}</span>
                    <span className="text-[10px] uppercase font-bold text-default bg-border px-2 py-0.5 rounded">{task.type}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-dark mb-3">{task.title}</h4>
                  {task.assignedTo && (
                    <div className="text-xs font-medium text-muted border-t border-border pt-2 flex justify-between items-center">
                      <span>Agent: <span className="text-dark font-bold">{task.assignedTo}</span></span>
                      {task.progress !== undefined && task.status === 'IN_PROGRESS' && (
                         <span className="text-primary font-bold">{Math.round(task.progress)}%</span>
                      )}
                    </div>
                  )}
                  {task.status !== 'PENDING' && task.status !== 'ASSIGNED' && (
                     <div className="w-full bg-border rounded-full h-1 mt-2 overflow-hidden">
                       <div className={`h-full rounded-full transition-all duration-300 ${task.status === 'COMPLETED' ? 'bg-success' : task.status === 'FAILED' ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${task.progress || (task.status === 'COMPLETED' ? 100 : 0)}%` }}></div>
                     </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
