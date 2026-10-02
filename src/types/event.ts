export type EventType = 'BATTERY_CRITICAL' | 'COMMS_LOSS' | 'ROUTE_BLOCKED' | 'AGENT_FAILURE' | 'NEW_TARGET' | 'WEATHER_CHANGE';

export interface SimulationEvent {
  id: string;
  tickTrigger: number;
  type: EventType;
  description: string;
  payload: any;
  resolved: boolean;
}

export const SimulationEvent = {};
export const _EVENT = 1;
