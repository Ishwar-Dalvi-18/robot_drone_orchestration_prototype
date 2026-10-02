import { Mission } from '../types/mission';
import { SimulationEvent } from '../types/event';
import { MOCK_AGENTS } from './mockAgents';

export const SCENARIOS = {
  primary: {
    id: 'scenario-flood-01',
    name: 'Post-Flood Disaster Response & Infrastructure Survey',
    description: 'Survey flood zones, inspect the bridge and substation, deliver medical kits to the hospital.',
    missionTemplate: {
      id: 'M-001',
      objective: 'Survey flood zones, inspect the bridge and substation, deliver medical kits to the hospital within 45 minutes',
      status: 'PLANNING',
      feasibilityScore: 92,
      deadline: 2700, // 45 mins in ticks (assuming 1 tick = 1 sec)
      startTime: null,
      tasks: [
        {
          id: 'T-01',
          title: 'Survey Flood Zone Alpha',
          type: 'SURVEY',
          location: { x: 200, y: 150 },
          requiredCapabilities: ['camera', 'thermal_sensor'],
          priority: 8,
          status: 'PENDING',
          assignedTo: null,
          dependencies: [],
          estimatedDuration: 300,
          progress: 0
        },
        {
          id: 'T-02',
          title: 'Deliver Medical Kits',
          type: 'DELIVERY',
          location: { x: 800, y: 600 },
          requiredCapabilities: ['cargo_drop'],
          priority: 10,
          status: 'PENDING',
          assignedTo: null,
          dependencies: [],
          estimatedDuration: 400,
          progress: 0
        },
        {
          id: 'T-03',
          title: 'Inspect Collapsed Bridge',
          type: 'INSPECTION',
          location: { x: 450, y: 500 },
          requiredCapabilities: ['close_inspection'],
          priority: 7,
          status: 'PENDING',
          assignedTo: null,
          dependencies: ['T-01'], // Wait for survey first
          estimatedDuration: 600,
          progress: 0
        },
        {
          id: 'T-04',
          title: 'Transport Heavy Debris',
          type: 'DELIVERY',
          location: { x: 300, y: 700 },
          requiredCapabilities: ['heavy_transport'],
          priority: 6,
          status: 'PENDING',
          assignedTo: null,
          dependencies: [],
          estimatedDuration: 800,
          progress: 0
        },
        {
          id: 'T-05',
          title: 'Establish Comms Relay Network',
          type: 'RELAY',
          location: { x: 600, y: 300 },
          requiredCapabilities: ['signal_relay'],
          priority: 9,
          status: 'PENDING',
          assignedTo: null,
          dependencies: [],
          estimatedDuration: 1200,
          progress: 0
        },
        {
          id: 'T-06',
          title: 'Survey Substation Perimeter',
          type: 'SURVEY',
          location: { x: 850, y: 200 },
          requiredCapabilities: ['camera', 'fast_flight'],
          priority: 5,
          status: 'PENDING',
          assignedTo: null,
          dependencies: [],
          estimatedDuration: 450,
          progress: 0
        }
      ]
    } as Mission,
    initialAgents: MOCK_AGENTS,
    scriptedEvents: [
      {
        id: 'EV-01',
        tickTrigger: 100,
        type: 'COMMS_LOSS',
        description: 'Communication dead-zone encountered in the valley.',
        payload: { area: { x: 400, y: 400, radius: 150 } },
        resolved: false
      },
      {
        id: 'EV-02',
        tickTrigger: 350,
        type: 'WEATHER_CHANGE',
        description: 'High winds detected, affecting aerial units.',
        payload: { severity: 'high', affectedAgents: ['A-01', 'B-02', 'E-05'] },
        resolved: false
      },
      {
        id: 'EV-03',
        tickTrigger: 600,
        type: 'BATTERY_CRITICAL',
        description: 'Scout Drone Alpha battery level critical due to high winds.',
        payload: { agentId: 'A-01', newBattery: 15 },
        resolved: false
      },
      {
        id: 'EV-04',
        tickTrigger: 900,
        type: 'ROUTE_BLOCKED',
        description: 'Ground Rover Charlie route blocked by new debris.',
        payload: { agentId: 'C-03', obstacleId: 'obs-03' },
        resolved: false
      }
    ] as SimulationEvent[]
  }
};
