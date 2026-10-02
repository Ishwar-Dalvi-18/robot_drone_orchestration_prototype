import { Agent } from '../types/agent';
import { MAP_DATA } from '../data/mapData';

export function calculateCommsCoverage(agent: Agent, relays: Agent[]): number {
  const distToBase = Math.sqrt(Math.pow(agent.position.x - MAP_DATA.baseStation.x, 2) + Math.pow(agent.position.y - MAP_DATA.baseStation.y, 2));
  let bestSignal = distToBase <= agent.commsRange ? 100 - (distToBase / agent.commsRange) * 50 : 0;
  
  for (const relay of relays) {
    const distToRelay = Math.sqrt(Math.pow(agent.position.x - relay.position.x, 2) + Math.pow(agent.position.y - relay.position.y, 2));
    if (distToRelay <= agent.commsRange) {
      const signal = 100 - (distToRelay / agent.commsRange) * 30;
      if (signal > bestSignal) bestSignal = signal;
    }
  }
  
  // Dead zone penalty
  for (const zone of MAP_DATA.zones) {
    if (zone.type === 'valley') {
      if (agent.position.x >= zone.bounds.x && agent.position.x <= zone.bounds.x + zone.bounds.w &&
          agent.position.y >= zone.bounds.y && agent.position.y <= zone.bounds.y + zone.bounds.h) {
        bestSignal *= 0.1; // 90% signal drop
      }
    }
  }
  
  return Math.max(0, Math.min(100, bestSignal));
}
