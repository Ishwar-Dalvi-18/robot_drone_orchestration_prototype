import { Agent } from '../types/agent';
import { MAP_DATA } from '../data/mapData';
import { calculateCommsCoverage } from './commsModel';

export function calculateAgentRisk(agent: Agent, relays: Agent[]): number {
  let risk = 0;
  
  // Battery risk
  if (agent.battery < 20) risk += 30;
  else if (agent.battery < 40) risk += 10;
  
  // Health risk
  if (agent.health < 80) risk += (100 - agent.health);
  
  // Comms risk
  const commsCoverage = calculateCommsCoverage(agent, relays);
  if (commsCoverage < 30) risk += 25;
  
  // Weather risk
  for (const wind of MAP_DATA.weather.windZones) {
    const dist = Math.sqrt(Math.pow(agent.position.x - wind.location.x, 2) + Math.pow(agent.position.y - wind.location.y, 2));
    if (dist <= wind.radius) {
      if (agent.weatherTolerance < wind.intensity) {
        risk += 40;
      }
    }
  }
  
  return Math.min(100, risk);
}
