import { create } from 'zustand';
import { Agent } from '../types/agent';
import { SimulationEvent } from '../types/event';

interface SimulationState {
  tick: number;
  isPlaying: boolean;
  speedMultiplier: number;
  agents: Agent[];
  events: SimulationEvent[];
  seed: number;
  
  // Actions
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  step: () => void;
  reset: () => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  setAgents: (agents: Agent[]) => void;
  addEvent: (event: SimulationEvent) => void;
  resolveEvent: (id: string) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  tick: 0,
  isPlaying: false,
  speedMultiplier: 1,
  agents: [],
  events: [],
  seed: 12345,
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (speed) => set({ speedMultiplier: speed }),
  step: () => set((state) => ({ tick: state.tick + 1 })),
  reset: () => set({ tick: 0, isPlaying: false, agents: [], events: [] }),
  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a)
  })),
  setAgents: (agents) => set({ agents }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  resolveEvent: (id) => set((state) => ({
    events: state.events.map(e => e.id === id ? { ...e, resolved: true } : e)
  }))
}));
