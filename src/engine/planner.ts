import { Mission } from '../types/mission';

function generateId() {
  return Math.random().toString(36).substring(2, 9).toUpperCase();
}

export function parseObjectiveToMission(objective: string): Mission {
  // Mock AI NLP parser that generates a mission plan from a text objective
  const mission: Mission = {
    id: `M-${generateId()}`,
    objective: objective,
    tasks: [],
    deadline: 3000,
    feasibilityScore: 100,
    status: 'PLANNING',
    startTime: null
  };
  
  const text = objective.toLowerCase();
  
  if (text.includes('flood') || text.includes('survey')) {
    mission.tasks.push({
      id: `T-${generateId()}`,
      title: 'Survey Area',
      type: 'SURVEY',
      location: { x: 200, y: 150 },
      requiredCapabilities: ['camera', 'thermal_sensor'],
      priority: 8,
      status: 'PENDING',
      assignedTo: null,
      dependencies: [],
      estimatedDuration: 300,
      progress: 0
    });
  }
  
  if (text.includes('bridge') || text.includes('inspect')) {
    mission.tasks.push({
      id: `T-${generateId()}`,
      title: 'Inspect Infrastructure',
      type: 'INSPECTION',
      location: { x: 450, y: 500 },
      requiredCapabilities: ['close_inspection'],
      priority: 7,
      status: 'PENDING',
      assignedTo: null,
      dependencies: [], 
      estimatedDuration: 600,
      progress: 0
    });
  }
  
  if (text.includes('medical') || text.includes('deliver')) {
    mission.tasks.push({
      id: `T-${generateId()}`,
      title: 'Deliver Supplies',
      type: 'DELIVERY',
      location: { x: 800, y: 600 },
      requiredCapabilities: ['cargo_drop'],
      priority: 10,
      status: 'PENDING',
      assignedTo: null,
      dependencies: [],
      estimatedDuration: 400,
      progress: 0
    });
  }
  
  if (mission.tasks.length === 0) {
    // Default fallback task
    mission.tasks.push({
        id: `T-${generateId()}`,
        title: 'General Reconnaissance',
        type: 'SURVEY',
        location: { x: 500, y: 500 },
        requiredCapabilities: ['camera'],
        priority: 5,
        status: 'PENDING',
        assignedTo: null,
        dependencies: [],
        estimatedDuration: 200,
        progress: 0
    });
  }
  
  return mission;
}
