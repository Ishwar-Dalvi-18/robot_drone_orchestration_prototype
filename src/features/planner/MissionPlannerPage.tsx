import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useMissionStore } from '../../store/useMissionStore';
import { parseObjectiveToMission } from '../../engine/planner';

export function MissionPlannerPage() {
  const [objective, setObjective] = useState('');
  const { currentMission, setMission } = useMissionStore();

  const handleGenerate = () => {
    if (!objective.trim()) return;
    const mission = parseObjectiveToMission(objective);
    setMission(mission);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-light text-dark tracking-wide">Mission Planner</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>High-Level Objective</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-32 p-3 border border-border rounded-lg focus:outline-none focus:border-primary text-sm mb-4 resize-none text-dark"
              placeholder="e.g. Survey the flood zone and inspect the collapsed bridge..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
            <button 
              onClick={handleGenerate}
              className="w-full py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Generate Mission Plan
            </button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generated Task Graph</CardTitle>
          </CardHeader>
          <CardContent>
            {!currentMission ? (
              <div className="text-center py-12 text-muted italic">No mission generated yet.</div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#1e1e24] p-4 rounded-lg border border-border">
                  <div>
                    <h4 className="font-bold text-dark">{currentMission.id}</h4>
                    <p className="text-sm text-default">{currentMission.objective}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold uppercase text-success">Feasibility: {currentMission.feasibilityScore}%</span>
                  </div>
                </div>

                <h5 className="font-semibold text-sm mt-4 mb-2 text-dark">Tasks</h5>
                <div className="space-y-2">
                  {currentMission.tasks.map((task, idx) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-dark">{task.title}</p>
                          <p className="text-xs text-muted">Requires: {task.requiredCapabilities.join(', ')}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-border text-xs font-semibold rounded-md text-default">{task.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
