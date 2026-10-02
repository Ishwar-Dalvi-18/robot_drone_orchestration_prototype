import { Position } from './agent';

export type TaskStatus = 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'REASSIGNED';
export type TaskType = 'SURVEY' | 'DELIVERY' | 'INSPECTION' | 'RELAY' | 'RETURN';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  location: Position;
  requiredCapabilities: string[];
  priority: number; // 1 (low) - 10 (critical)
  status: TaskStatus;
  assignedTo: string | null; // Agent ID
  dependencies: string[]; // Task IDs
  estimatedDuration: number; // in ticks
  progress: number; // 0-100
}

export const Task = {};
export const _TASK = 1;
