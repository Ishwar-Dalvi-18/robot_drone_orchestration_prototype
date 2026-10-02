import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  selectedAgentId: string | null;
  selectedTaskId: string | null;
  activeMapLayer: 'default' | 'risk' | 'comms' | 'weather';
  autonomyLevel: 'Manual' | 'Supervised' | 'Autonomous';
  
  // Actions
  toggleSidebar: () => void;
  selectAgent: (id: string | null) => void;
  selectTask: (id: string | null) => void;
  setMapLayer: (layer: 'default' | 'risk' | 'comms' | 'weather') => void;
  setAutonomyLevel: (level: 'Manual' | 'Supervised' | 'Autonomous') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  selectedAgentId: null,
  selectedTaskId: null,
  activeMapLayer: 'default',
  autonomyLevel: 'Supervised',
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  selectAgent: (id) => set({ selectedAgentId: id }),
  selectTask: (id) => set({ selectedTaskId: id }),
  setMapLayer: (layer) => set({ activeMapLayer: layer }),
  setAutonomyLevel: (level) => set({ autonomyLevel: level }),
}));
