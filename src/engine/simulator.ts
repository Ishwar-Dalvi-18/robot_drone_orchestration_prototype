import { useSimulationStore } from '../store/useSimulationStore';
import { useMissionStore } from '../store/useMissionStore';
import { SCENARIOS } from '../data/scenarios';
import { allocateTasks } from './allocator';
import { MAP_DATA } from '../data/mapData';


export class Simulator {
  private timer: number | null = null;
  private baseTickRateMs = 1000;
  
  start() {
    if (this.timer) return;
    useSimulationStore.getState().togglePlay();
    this.scheduleNextTick();
  }
  
  pause() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    if (useSimulationStore.getState().isPlaying) {
       useSimulationStore.getState().togglePlay();
    }
  }
  
  setSpeed(multiplier: number) {
    useSimulationStore.getState().setSpeed(multiplier);
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.scheduleNextTick();
    }
  }
  
  loadScenario(scenarioId: keyof typeof SCENARIOS) {
    const scenario = SCENARIOS[scenarioId];
    useSimulationStore.getState().reset();
    useSimulationStore.getState().setAgents(scenario.initialAgents);
    scenario.scriptedEvents.forEach(e => useSimulationStore.getState().addEvent(e));
    useMissionStore.getState().setMission(scenario.missionTemplate);
  }
  
  private scheduleNextTick() {
    const speed = useSimulationStore.getState().speedMultiplier;
    this.timer = window.setTimeout(() => {
      this.tick();
      if (useSimulationStore.getState().isPlaying) {
        this.scheduleNextTick();
      }
    }, this.baseTickRateMs / speed);
  }
  
  private tick() {
    const state = useSimulationStore.getState();
    const missionStore = useMissionStore.getState();
    if (!state.isPlaying) return;
    
    // Advance time
    state.step();
    const currentTick = state.tick;
    
    let updatedMissionTasks = missionStore.currentMission ? [...missionStore.currentMission.tasks] : [];
    let assignmentsMade = false;

    // Allocate tasks if there's a mission
    if (missionStore.currentMission) {
       const assignments = allocateTasks(state.agents, updatedMissionTasks);

       // Assign agents in the local array
       const agentsToUpdate = [...state.agents];
       
       for (const a of assignments) {
          const taskIdx = updatedMissionTasks.findIndex(t => t.id === a.taskId);
          const agentIdx = agentsToUpdate.findIndex(ag => ag.id === a.agentId);
          if (taskIdx > -1 && agentIdx > -1) {
             updatedMissionTasks[taskIdx] = { ...updatedMissionTasks[taskIdx], status: 'ASSIGNED', assignedTo: a.agentId };
             agentsToUpdate[agentIdx] = { ...agentsToUpdate[agentIdx], status: 'EXECUTING', currentTaskId: a.taskId };
             assignmentsMade = true;
             
             // Log the decision
             missionStore.addDecisionLog({
                 id: `DL-${Date.now()}-${a.taskId}`,
                 tick: currentTick,
                 triggerEvent: 'Task Pending',
                 chosenAction: `Assigned Task ${a.taskId} to Agent ${agentsToUpdate[agentIdx].name}`,
                 rationale: `Agent scored ${Math.round(a.score)} based on capabilities, distance, and battery constraints.`,
                 confidence: (a.score / 100) || 0.8
             });
          }
       }
       if (assignmentsMade) {
          state.setAgents(agentsToUpdate);
       }
    }
    
    // 1. Move Agents & drain battery
    const updatedAgents = state.agents.map(agent => {
      let newBattery = agent.battery - agent.batteryDrainRate;
      if (newBattery < 0) newBattery = 0;
      
      let newPos = { ...agent.position };
      let newSpeed = agent.speed;
      let newStatus = agent.status;
      
      // Move if executing a task
      if (agent.status === 'EXECUTING' && agent.currentTaskId) {
         const taskIdx = updatedMissionTasks.findIndex(t => t.id === agent.currentTaskId);
         if (taskIdx > -1) {
            const task = updatedMissionTasks[taskIdx];
            const dx = task.location.x - agent.position.x;
            const dy = task.location.y - agent.position.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist > 5) {
               newSpeed = 2; // move at 2 units per tick
               newPos.x += (dx / dist) * newSpeed;
               newPos.y += (dy / dist) * newSpeed;
            } else {
               // Arrived - Start progressing the task
               newSpeed = 0;
               // simulate work being done
               // Since estimatedDuration is in ticks, we advance progress by (100 / estimatedDuration) per tick
               const progressInc = (100 / (task.estimatedDuration || 100));
               updatedMissionTasks[taskIdx] = { 
                   ...task, 
                   status: 'IN_PROGRESS',
                   progress: Math.min(100, task.progress + progressInc)
               };
               
               if (updatedMissionTasks[taskIdx].progress >= 100) {
                   updatedMissionTasks[taskIdx].status = 'COMPLETED';
                   newStatus = 'IDLE';
                   // Note: we can't delete agent.currentTaskId directly if returning a new object, so let's set a flag
                   return { ...agent, battery: newBattery, position: newPos, speed: newSpeed, status: newStatus, currentTaskId: null };
               }
            }
         }
      } else if (agent.status === 'IDLE') {
         // Return to Base
         const dx = MAP_DATA.baseStation.x - agent.position.x;
         const dy = MAP_DATA.baseStation.y - agent.position.y;
         const dist = Math.sqrt(dx*dx + dy*dy);
         if (dist > 5) {
             newSpeed = 1.5;
             newPos.x += (dx / dist) * newSpeed;
             newPos.y += (dy / dist) * newSpeed;
         } else {
             newSpeed = 0;
             // Recharge if at base
             if (newBattery < 100) {
                 newBattery = Math.min(100, newBattery + 2);
             }
         }
      }

      return { ...agent, battery: newBattery, position: newPos, speed: newSpeed, status: newStatus };
    });
    
    if (missionStore.currentMission) {
       missionStore.setMission({ ...missionStore.currentMission, tasks: updatedMissionTasks });
    }
    
    state.setAgents(updatedAgents);
    
    // 2. Check for scripted events
    const pendingEvents = state.events.filter(e => !e.resolved && e.tickTrigger <= currentTick);
    for (const event of pendingEvents) {
      this.handleEvent(event);
      state.resolveEvent(event.id);
    }
  }
  
  private handleEvent(event: any) {
    console.log(`[Simulator] Event Triggered at tick ${event.tickTrigger}: ${event.type} - ${event.description}`);
    
    // Create an escalation for human operator if it's a critical event
    if (event.type === 'WEATHER_CHANGE' || event.type === 'ROUTE_BLOCKED' || event.type === 'BATTERY_CRITICAL') {
       useMissionStore.getState().addEscalation({
           id: `ESC-${event.id}`,
           tick: event.tickTrigger,
           type: 'SAFETY',
           status: 'PENDING',
           context: event.description,
           options: [
               { id: 'opt-1', description: 'Override: Reroute/Return to Base', aiRecommended: true },
               { id: 'opt-2', description: 'Acknowledge & Continue (High Risk)', aiRecommended: false }
           ]
       });
    }
  }
}

export const simulator = new Simulator();
