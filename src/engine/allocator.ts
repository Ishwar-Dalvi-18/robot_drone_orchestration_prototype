import { Agent } from '../types/agent';
import { Task } from '../types/task';
import { estimateETA } from './router';

export function scoreAgentForTask(agent: Agent, task: Task): number {
  let score = 100;
  
  // 1. Capability Match (Hard constraint)
  const hasCapabilities = task.requiredCapabilities.every(req => agent.capabilities.includes(req));
  if (!hasCapabilities) return 0;
  
  // 2. Distance Penalty
  const distance = Math.sqrt(Math.pow(agent.position.x - task.location.x, 2) + Math.pow(agent.position.y - task.location.y, 2));
  score -= (distance * 0.1); 
  
  // 3. Battery Sufficiency (Hard constraint)
  // Distance to task + task duration + return distance
  const estimatedCost = (distance * 0.02) + (task.estimatedDuration * agent.batteryDrainRate);
  if (agent.battery - estimatedCost < 15) return 0; // 15% reserve limit
  
  // 4. Payload Fit
  if (task.type === 'DELIVERY' && agent.payloadCapacity < 5) return 0;

  // 5. Risk / Weather (e.g. wind vs tolerance)
  if (agent.weatherTolerance < 50 && task.location.y > 600) {
    score -= 20; // rough penalty for bad weather zone
  }

  return Math.max(0, score);
}

export interface AllocationResult {
  agentId: string;
  taskId: string;
  score: number;
}

export function allocateTasks(agents: Agent[], tasks: Task[]): AllocationResult[] {
  const assignments: AllocationResult[] = [];
  const availableAgents = [...agents].filter(a => a.status === 'IDLE');
  
  const pendingTasks = tasks.filter(t => t.status === 'PENDING').sort((a, b) => b.priority - a.priority);
  
  for (const task of pendingTasks) {
    let bestAgent = null;
    let bestScore = -1;
    
    for (const agent of availableAgents) {
      const score = scoreAgentForTask(agent, task);
      if (score > bestScore) {
        bestScore = score;
        bestAgent = agent;
      }
    }
    
    if (bestAgent && bestScore > 0) {
      assignments.push({ agentId: bestAgent.id, taskId: task.id, score: bestScore });
      const idx = availableAgents.findIndex(a => a.id === bestAgent!.id);
      if (idx > -1) availableAgents.splice(idx, 1);
    }
  }
  
  return assignments;
}
