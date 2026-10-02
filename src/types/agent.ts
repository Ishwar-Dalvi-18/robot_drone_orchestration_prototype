export type AgentType = 'scout_drone' | 'heavy_drone' | 'ground_rover' | 'crawler' | 'relay_drone' | 'boat';
export type AgentState = 'IDLE' | 'ASSIGNED' | 'EN_ROUTE' | 'EXECUTING' | 'RETURNING' | 'CHARGING' | 'FAILED' | 'OFFLINE';

export interface Position {
  x: number;
  y: number;
}

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  role: string;
  position: Position;
  heading: number;
  speed: number;
  battery: number; // 0-100
  batteryDrainRate: number; // % per tick
  payloadCapacity: number;
  currentPayload: number;
  capabilities: string[];
  commsRange: number;
  commsStatus: 'online' | 'degraded' | 'offline';
  status: AgentState;
  health: number; // 0-100
  currentTaskId: string | null;
  taskQueue: string[]; // Task IDs
  riskScore: number;
  terrainConstraints: string[]; // e.g., 'ground', 'water'
  weatherTolerance: number; // 0-100
}

export const Agent = {};
export const Position = {};
export const _AGENT = 1;
