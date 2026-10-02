import { create } from 'zustand';
import { Mission } from '../types/mission';
import type { DecisionLog, Escalation } from '../types/engine';
import { Task } from '../types/task';

interface MissionState {
  currentMission: Mission | null;
  decisionLogs: DecisionLog[];
  escalations: Escalation[];
  
  // Actions
  setMission: (mission: Mission) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addDecisionLog: (log: DecisionLog) => void;
  addEscalation: (escalation: Escalation) => void;
  resolveEscalation: (id: string, status: 'RESOLVED' | 'TIMEOUT') => void;
  updateFeasibility: (score: number) => void;
}

export const useMissionStore = create<MissionState>((set) => ({
  currentMission: null,
  decisionLogs: [],
  escalations: [],
  
  setMission: (mission) => set({ currentMission: mission }),
  updateTask: (taskId, updates) => set((state) => {
    if (!state.currentMission) return state;
    return {
      currentMission: {
        ...state.currentMission,
        tasks: state.currentMission.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
      }
    };
  }),
  addDecisionLog: (log) => set((state) => ({ decisionLogs: [log, ...state.decisionLogs] })),
  addEscalation: (escalation) => set((state) => ({ escalations: [escalation, ...state.escalations] })),
  resolveEscalation: (id, status) => set((state) => ({
    escalations: state.escalations.map(e => e.id === id ? { ...e, status } : e)
  })),
  updateFeasibility: (score) => set((state) => ({
    currentMission: state.currentMission ? { ...state.currentMission, feasibilityScore: score } : null
  }))
}));
