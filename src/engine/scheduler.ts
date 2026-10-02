import { Task } from '../types/task';
import { Agent } from '../types/agent';
import { allocateTasks, type AllocationResult } from './allocator';

// The scheduler takes the current pool of agents and the DAG of pending tasks
// and assigns them out based on the allocation cost function.
export function scheduleMission(agents: Agent[], tasks: Task[]): AllocationResult[] {
  // In a full system, this would resolve DAG dependencies.
  // For the prototype, we only consider tasks whose dependencies are COMPLETED.
  const readyTasks = tasks.filter(t => {
    if (t.status !== 'PENDING') return false;
    if (t.dependencies.length === 0) return true;
    
    // Check if all dependencies are completed
    return t.dependencies.every(depId => {
      const depTask = tasks.find(x => x.id === depId);
      return depTask && depTask.status === 'COMPLETED';
    });
  });
  
  return allocateTasks(agents, readyTasks);
}
