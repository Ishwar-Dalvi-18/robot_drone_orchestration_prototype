import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useUIStore } from '../../store/useUIStore';

export function SettingsPage() {
  const { autonomyLevel, setAutonomyLevel } = useUIStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-light text-dark tracking-wide">Platform Settings</h2>
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Autonomy Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(['Manual', 'Supervised', 'Autonomous'] as const).map(level => (
              <button
                key={level}
                onClick={() => setAutonomyLevel(level)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${autonomyLevel === level ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/50 bg-surface'}`}
              >
                <div className="text-left">
                  <h4 className={`font-bold ${autonomyLevel === level ? 'text-primary' : 'text-dark'}`}>{level}</h4>
                  <p className="text-xs text-muted mt-1">
                    {level === 'Manual' && 'All allocations and replanning require human approval.'}
                    {level === 'Supervised' && 'AI executes plans but asks for approval on high-risk escalations.'}
                    {level === 'Autonomous' && 'AI operates completely independently, logging all decisions.'}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${autonomyLevel === level ? 'border-primary' : 'border-gray-300'}`}>
                  {autonomyLevel === level && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
