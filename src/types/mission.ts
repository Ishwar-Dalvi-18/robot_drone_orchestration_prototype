import { Task } from './task';

export interface Mission {
  id: string;
  objective: string;
  tasks: Task[];
  deadline: number; // Target completion tick
  feasibilityScore: number;
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'ABORTED';
  startTime: number | null;
}

export const Mission = {};
export const _MISSION = 1;
