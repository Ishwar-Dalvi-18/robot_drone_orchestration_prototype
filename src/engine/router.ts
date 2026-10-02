import { Position } from '../types/agent';
import { MAP_DATA } from '../data/mapData';

const CELL_SIZE = 20;

function toGrid(p: Position) {
  return { x: Math.floor(p.x / CELL_SIZE), y: Math.floor(p.y / CELL_SIZE) };
}
function toWorld(p: Position) {
  return { x: p.x * CELL_SIZE + CELL_SIZE / 2, y: p.y * CELL_SIZE + CELL_SIZE / 2 };
}

function heuristic(a: Position, b: Position) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function isBlocked(p: Position, constraints: string[]) {
  const worldP = toWorld(p);
  
  if (constraints.includes('blocked_road')) {
    for (const obs of MAP_DATA.obstacles) {
      if (obs.type === 'blocked_road') {
        const dist = Math.sqrt(Math.pow(worldP.x - obs.location.x, 2) + Math.pow(worldP.y - obs.location.y, 2));
        if (dist <= obs.radius) return true;
      }
    }
  }
  if (constraints.includes('water')) {
    for (const zone of MAP_DATA.zones) {
      if (zone.type === 'flood') {
        if (worldP.x >= zone.bounds.x && worldP.x <= zone.bounds.x + zone.bounds.w &&
            worldP.y >= zone.bounds.y && worldP.y <= zone.bounds.y + zone.bounds.h) {
          return true;
        }
      }
    }
  }
  return false;
}

export function calculateRoute(start: Position, end: Position, agentConstraints: string[]): Position[] {
  const startGrid = toGrid(start);
  const endGrid = toGrid(end);
  
  // Basic A* on 50x50 grid
  const openSet = [startGrid];
  const cameFrom = new Map<string, Position>();
  const gScore = new Map<string, number>();
  
  const toKey = (p: Position) => `${p.x},${p.y}`;
  gScore.set(toKey(startGrid), 0);
  
  const fScore = new Map<string, number>();
  fScore.set(toKey(startGrid), heuristic(startGrid, endGrid));
  
  let iterations = 0;
  
  while (openSet.length > 0 && iterations < 2000) {
    iterations++;
    // Get lowest fScore
    openSet.sort((a, b) => (fScore.get(toKey(a)) || Infinity) - (fScore.get(toKey(b)) || Infinity));
    const current = openSet.shift()!;
    
    if (current.x === endGrid.x && current.y === endGrid.y) {
      const path = [];
      let currStr = toKey(current);
      while (cameFrom.has(currStr)) {
        const p = cameFrom.get(currStr)!;
        path.unshift(toWorld(p));
        currStr = toKey(p);
      }
      path.push(end); // Exact end point
      return path;
    }
    
    const neighbors = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 }
    ];
    
    for (const neighbor of neighbors) {
      if (neighbor.x < 0 || neighbor.y < 0 || neighbor.x > 50 || neighbor.y > 50) continue;
      if (isBlocked(neighbor, agentConstraints)) continue;
      
      const tentativeG = (gScore.get(toKey(current)) || Infinity) + 1;
      
      if (tentativeG < (gScore.get(toKey(neighbor)) || Infinity)) {
        cameFrom.set(toKey(neighbor), current);
        gScore.set(toKey(neighbor), tentativeG);
        fScore.set(toKey(neighbor), tentativeG + heuristic(neighbor, endGrid));
        if (!openSet.find(p => p.x === neighbor.x && p.y === neighbor.y)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  
  // Fallback if no path found or exceeded iterations
  return [start, end];
}

export function estimateETA(start: Position, end: Position, speed: number): number {
  const dist = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
  return speed > 0 ? dist / speed : dist;
}
