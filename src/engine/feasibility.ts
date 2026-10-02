import { Mission } from '../types/mission';
import { Agent } from '../types/agent';
import { calculateAgentRisk } from './riskModel';

export function calculateMissionFeasibility(mission: Mission, agents: Agent[]): number {
  let totalTasks = mission.tasks.length;
  if (totalTasks === 0) return 100;
  
  let completed = mission.tasks.filter(t => t.status === 'COMPLETED').length;
  let failed = mission.tasks.filter(t => t.status === 'FAILED').length;
  
  // Base progress factor
  const progressFactor = (completed / totalTasks) * 100;
  
  // Average swarm risk
  let totalRisk = 0;
  const relays = agents.filter(a => a.type === 'relay_drone');
  for (const agent of agents) {
    if (agent.status !== 'OFFLINE' && agent.status !== 'FAILED') {
      totalRisk += calculateAgentRisk(agent, relays);
    }
  }
  const avgRisk = agents.length > 0 ? totalRisk / agents.length : 100;
  
  // If tasks failed, deduct significantly
  const failurePenalty = failed * 15;
  
  let feasibility = 100 - avgRisk - failurePenalty + (progressFactor * 0.2);
  
  return Math.max(0, Math.min(100, Math.round(feasibility)));
}
