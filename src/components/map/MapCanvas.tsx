import React from 'react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useMissionStore } from '../../store/useMissionStore';
import { MAP_DATA } from '../../data/mapData';

export function MapCanvas() {
  const { agents } = useSimulationStore();
  const { currentMission } = useMissionStore();

  return (
    <div className="w-full h-full min-h-[600px] bg-[#0b1120] rounded-2xl shadow-divi border border-primary/20 overflow-hidden relative">
      <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Base Grid Background & Filters */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1"/>
            <circle cx="40" cy="40" r="1.5" fill="rgba(59, 130, 246, 0.3)" />
          </pattern>
          <pattern id="hex-grid" width="60" height="103.923" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
             <path fill="none" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" d="M30 0L60 17.32v34.64L30 69.28 0 51.96V17.32z"/>
             <path fill="none" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" d="M30 103.923L60 86.603V51.96L30 34.64 0 51.96v34.643z"/>
          </pattern>
          <filter id="glow-primary" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-danger" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="shadow-sm">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" floodColor="#000000" />
          </filter>
        </defs>
        
        {/* Deep dark background with dual grids */}
        <rect width="1000" height="1000" fill="#0b1120" />
        <rect width="1000" height="1000" fill="url(#hex-grid)" />
        <rect width="1000" height="1000" fill="url(#grid)" />

        {/* Zones */}
        {MAP_DATA.zones.map(zone => (
          <g key={zone.id} className="transition-all duration-500">
            <rect 
              x={zone.bounds.x} y={zone.bounds.y} 
              width={zone.bounds.w} height={zone.bounds.h}
              fill={zone.type === 'flood' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(148, 163, 184, 0.08)'}
              stroke={zone.type === 'flood' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(148, 163, 184, 0.4)'}
              strokeWidth="1.5"
              strokeDasharray={zone.type === 'valley' ? '12,8' : 'none'}
              rx="4"
            />
            {/* Corner accents for tactical look */}
            <path d={`M ${zone.bounds.x} ${zone.bounds.y + 10} v -10 h 10`} fill="none" stroke={zone.type === 'flood' ? '#3b82f6' : '#94a3b8'} strokeWidth="2" />
            <path d={`M ${zone.bounds.x + zone.bounds.w} ${zone.bounds.y + 10} v -10 h -10`} fill="none" stroke={zone.type === 'flood' ? '#3b82f6' : '#94a3b8'} strokeWidth="2" />
            
            <text x={zone.bounds.x + 16} y={zone.bounds.y + 24} className="text-[12px] fill-slate-300 font-semibold uppercase tracking-widest font-sans">
              {zone.type === 'valley' ? 'COMMS DEAD-ZONE' : `FLOOD ZONE [${(zone.severity?.toUpperCase() ?? 'UNKNOWN')}]`}
            </text>
          </g>
        ))}

        {/* Obstacles */}
        {MAP_DATA.obstacles.map(obs => (
          <g key={obs.id} className="animate-float">
            <circle 
              cx={obs.location.x} cy={obs.location.y} 
              r={obs.radius}
              fill="rgba(239, 68, 68, 0.15)"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="4,6"
              filter="url(#glow-danger)"
            />
            <circle cx={obs.location.x} cy={obs.location.y} r="3" fill="#ef4444" />
             <text x={obs.location.x} y={obs.location.y - 12} textAnchor="middle" className="text-[10px] font-bold fill-danger tracking-[0.2em]">
              {obs.type === 'blocked_road' ? 'ROAD_BLK' : 'BRG_FAIL'}
            </text>
          </g>
        ))}

        {/* Base Station */}
        <g transform={`translate(${MAP_DATA.baseStation.x - 28}, ${MAP_DATA.baseStation.y - 28})`} filter="url(#shadow-sm)">
          <rect width="56" height="56" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" filter="url(#glow-primary)"/>
          <text x="28" y="36" textAnchor="middle" fill="#3b82f6" className="text-2xl font-black font-sans tracking-widest">HQ</text>
        </g>
        
        {/* Hospital & Substation Targets */}
        <g transform={`translate(${MAP_DATA.hospital.x - 24}, ${MAP_DATA.hospital.y - 24})`} filter="url(#shadow-sm)">
           <path d="M 24 0 L 48 12 L 48 36 L 24 48 L 0 36 L 0 12 Z" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2" />
           <text x="24" y="30" textAnchor="middle" fill="#22c55e" className="text-2xl font-bold">+</text>
        </g>
        <g transform={`translate(${MAP_DATA.substation.x - 24}, ${MAP_DATA.substation.y - 24})`} filter="url(#shadow-sm)">
           <path d="M 24 0 L 48 12 L 48 36 L 24 48 L 0 36 L 0 12 Z" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
           <text x="24" y="30" textAnchor="middle" fill="#f59e0b" className="text-xl font-bold">⚡</text>
        </g>

        {/* Agent Trajectories (Dynamic paths) */}
        {agents.filter(a => a.status === 'EXECUTING' && a.currentTaskId).map(agent => {
           const task = currentMission?.tasks.find(t => t.id === agent.currentTaskId);
           if (!task) return null;
           return (
             <g key={`path-${agent.id}`}>
               <line 
                 x1={agent.position.x} y1={agent.position.y} 
                 x2={task.location.x} y2={task.location.y} 
                 stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6,6" opacity="0.4"
               />
               <circle cx={task.location.x} cy={task.location.y} r="6" fill="none" stroke="#0ea5e9" strokeWidth="2" className="animate-pulse-fast" />
             </g>
           );
        })}

        {/* Tasks (Markers) */}
        {currentMission?.tasks.map(task => (
          <g key={task.id} transform={`translate(${task.location.x}, ${task.location.y})`} filter="url(#shadow-sm)" className="cursor-pointer hover:scale-110 transition-transform">
            <title>{task.title} ({task.status}) - Progress: {Math.round(task.progress || 0)}%</title>
            <circle cx="0" cy="0" r="32" fill={task.status === 'COMPLETED' ? '#10b981' : '#0ea5e9'} opacity="0.1" className={task.status !== 'COMPLETED' ? "animate-pulse-fast" : ""} />
            <path d="M 0 -14 L 12 0 L 0 14 L -12 0 Z" fill={task.status === 'COMPLETED' ? '#10b981' : '#0ea5e9'} filter={task.status !== 'COMPLETED' ? "url(#glow-primary)" : ""} />
            <text x="0" y="-22" textAnchor="middle" className="text-[11px] font-bold fill-slate-300 tracking-wider">{task.id}</text>
          </g>
        ))}

        {/* Agents */}
        {agents.map(agent => (
          <g key={agent.id} transform={`translate(${agent.position.x}, ${agent.position.y})`} className="transition-all duration-1000 ease-in-out cursor-pointer hover:scale-110" filter="url(#shadow-sm)">
            <title>{agent.name} | {agent.role} | Status: {agent.status} | Battery: {Math.round(agent.battery)}%</title>
            {/* Range Indicator */}
            {(agent.type === 'relay_drone' || agent.id === 'A-01') && (
              <circle r={agent.commsRange} fill="rgba(14, 165, 233, 0.03)" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4,8" opacity="0.6" />
            )}
            
            {/* Agent Outer Ring */}
            <circle r="20" fill="none" stroke={agent.status === 'FAILED' ? '#ef4444' : agent.status === 'EXECUTING' ? '#0ea5e9' : '#94a3b8'} strokeWidth="1.5" strokeDasharray="4,2" className={agent.status === 'EXECUTING' ? "animate-[spin_4s_linear_infinite]" : ""} />
            
            {/* Agent Core */}
            <circle r="14" fill="#18181b" stroke={agent.status === 'FAILED' ? '#ef4444' : agent.status === 'EXECUTING' ? '#0ea5e9' : '#94a3b8'} strokeWidth="2.5" filter={agent.status === 'EXECUTING' ? "url(#glow-primary)" : ""} />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-white tracking-widest">{agent.id.split('-')[1]}</text>
            
            {/* Battery Warning Pulse */}
            {agent.battery < 20 && agent.status !== 'FAILED' && (
              <circle r="28" fill="none" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.8" className="animate-pulse-fast" filter="url(#glow-danger)" />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
// import React from 'react';
// import { useSimulationStore } from '../../store/useSimulationStore';
// import { useMissionStore } from '../../store/useMissionStore';
// import { MAP_DATA } from '../../data/mapData';

// export function MapCanvas() {
//   const { agents } = useSimulationStore();
//   const { currentMission } = useMissionStore();

//   return (
//     <div className="w-full h-full min-h-[600px] bg-[#0b1120] rounded-2xl shadow-divi border border-primary/20 overflow-hidden relative">
//       <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
//         {/* Base Grid Background & Filters */}
//         <defs>
//           <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//             <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1"/>
//             <circle cx="40" cy="40" r="1.5" fill="rgba(59, 130, 246, 0.3)" />
//           </pattern>
//           <pattern id="hex-grid" width="60" height="103.923" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
//              <path fill="none" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" d="M30 0L60 17.32v34.64L30 69.28 0 51.96V17.32z"/>
//              <path fill="none" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" d="M30 103.923L60 86.603V51.96L30 34.64 0 51.96v34.643z"/>
//           </pattern>
//           <filter id="glow-primary" x="-50%" y="-50%" width="200%" height="200%">
//             <feGaussianBlur stdDeviation="6" result="blur" />
//             <feComposite in="SourceGraphic" in2="blur" operator="over" />
//           </filter>
//           <filter id="glow-danger" x="-50%" y="-50%" width="200%" height="200%">
//             <feGaussianBlur stdDeviation="8" result="blur" />
//             <feComposite in="SourceGraphic" in2="blur" operator="over" />
//           </filter>
//           <filter id="shadow-sm">
//             <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" floodColor="#000000" />
//           </filter>
//         </defs>
        
//         {/* Deep dark background with dual grids */}
//         <rect width="1000" height="1000" fill="#0b1120" />
//         <rect width="1000" height="1000" fill="url(#hex-grid)" />
//         <rect width="1000" height="1000" fill="url(#grid)" />

//         {/* Zones */}
//         {MAP_DATA.zones.map(zone => (
//           <g key={zone.id} className="transition-all duration-500">
//             <rect 
//               x={zone.bounds.x} y={zone.bounds.y} 
//               width={zone.bounds.w} height={zone.bounds.h}
//               fill={zone.type === 'flood' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(148, 163, 184, 0.08)'}
//               stroke={zone.type === 'flood' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(148, 163, 184, 0.4)'}
//               strokeWidth="1.5"
//               strokeDasharray={zone.type === 'valley' ? '12,8' : 'none'}
//               rx="4"
//             />
//             {/* Corner accents for tactical look */}
//             <path d={`M ${zone.bounds.x} ${zone.bounds.y + 10} v -10 h 10`} fill="none" stroke={zone.type === 'flood' ? '#3b82f6' : '#94a3b8'} strokeWidth="2" />
//             <path d={`M ${zone.bounds.x + zone.bounds.w} ${zone.bounds.y + 10} v -10 h -10`} fill="none" stroke={zone.type === 'flood' ? '#3b82f6' : '#94a3b8'} strokeWidth="2" />
            
//             <text x={zone.bounds.x + 16} y={zone.bounds.y + 24} className="text-[12px] fill-slate-300 font-semibold uppercase tracking-widest font-sans">
//               {zone.type === 'valley' ? 'COMMS DEAD-ZONE' : `FLOOD ZONE [${zone.severity.toUpperCase()}]`}
//             </text>
//           </g>
//         ))}

//         {/* Obstacles */}
//         {MAP_DATA.obstacles.map(obs => (
//           <g key={obs.id} className="animate-float">
//             <circle 
//               cx={obs.location.x} cy={obs.location.y} 
//               r={obs.radius}
//               fill="rgba(239, 68, 68, 0.15)"
//               stroke="#ef4444"
//               strokeWidth="2"
//               strokeDasharray="4,6"
//               filter="url(#glow-danger)"
//             />
//             <circle cx={obs.location.x} cy={obs.location.y} r="3" fill="#ef4444" />
//              <text x={obs.location.x} y={obs.location.y - 12} textAnchor="middle" className="text-[10px] font-bold fill-danger tracking-[0.2em]">
//               {obs.type === 'blocked_road' ? 'ROAD_BLK' : 'BRG_FAIL'}
//             </text>
//           </g>
//         ))}

//         {/* Base Station */}
//         <g transform={`translate(${MAP_DATA.baseStation.x - 28}, ${MAP_DATA.baseStation.y - 28})`} filter="url(#shadow-sm)">
//           <rect width="56" height="56" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" filter="url(#glow-primary)"/>
//           <text x="28" y="36" textAnchor="middle" fill="#3b82f6" className="text-2xl font-black font-sans tracking-widest">HQ</text>
//         </g>
        
//         {/* Hospital & Substation Targets */}
//         <g transform={`translate(${MAP_DATA.hospital.x - 24}, ${MAP_DATA.hospital.y - 24})`} filter="url(#shadow-sm)">
//            <path d="M 24 0 L 48 12 L 48 36 L 24 48 L 0 36 L 0 12 Z" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2" />
//            <text x="24" y="30" textAnchor="middle" fill="#22c55e" className="text-2xl font-bold">+</text>
//         </g>
//         <g transform={`translate(${MAP_DATA.substation.x - 24}, ${MAP_DATA.substation.y - 24})`} filter="url(#shadow-sm)">
//            <path d="M 24 0 L 48 12 L 48 36 L 24 48 L 0 36 L 0 12 Z" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
//            <text x="24" y="30" textAnchor="middle" fill="#f59e0b" className="text-xl font-bold">⚡</text>
//         </g>

//         {/* Agent Trajectories (Dynamic paths) */}
//         {agents.filter(a => a.status === 'EXECUTING' && a.currentTaskId).map(agent => {
//            const task = currentMission?.tasks.find(t => t.id === agent.currentTaskId);
//            if (!task) return null;
//            return (
//              <g key={`path-${agent.id}`}>
//                <line 
//                  x1={agent.position.x} y1={agent.position.y} 
//                  x2={task.location.x} y2={task.location.y} 
//                  stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6,6" opacity="0.4"
//                />
//                <circle cx={task.location.x} cy={task.location.y} r="6" fill="none" stroke="#0ea5e9" strokeWidth="2" className="animate-pulse-fast" />
//              </g>
//            );
//         })}

//         {/* Tasks (Markers) */}
//         {currentMission?.tasks.map(task => (
//           <g key={task.id} transform={`translate(${task.location.x}, ${task.location.y})`} filter="url(#shadow-sm)" className="cursor-pointer hover:scale-110 transition-transform">
//             <title>{task.title} ({task.status}) - Progress: {Math.round(task.progress || 0)}%</title>
//             <circle cx="0" cy="0" r="32" fill={task.status === 'COMPLETED' ? '#10b981' : '#0ea5e9'} opacity="0.1" className={task.status !== 'COMPLETED' ? "animate-pulse-fast" : ""} />
//             <path d="M 0 -14 L 12 0 L 0 14 L -12 0 Z" fill={task.status === 'COMPLETED' ? '#10b981' : '#0ea5e9'} filter={task.status !== 'COMPLETED' ? "url(#glow-primary)" : ""} />
//             <text x="0" y="-22" textAnchor="middle" className="text-[11px] font-bold fill-slate-300 tracking-wider">{task.id}</text>
//           </g>
//         ))}

//         {/* Agents */}
//         {agents.map(agent => (
//           <g key={agent.id} transform={`translate(${agent.position.x}, ${agent.position.y})`} className="transition-all duration-1000 ease-in-out cursor-pointer hover:scale-110" filter="url(#shadow-sm)">
//             <title>{agent.name} | {agent.role} | Status: {agent.status} | Battery: {Math.round(agent.battery)}%</title>
//             {/* Range Indicator */}
//             {(agent.type === 'relay_drone' || agent.id === 'A-01') && (
//               <circle r={agent.commsRange} fill="rgba(14, 165, 233, 0.03)" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4,8" opacity="0.6" />
//             )}
            
//             {/* Agent Outer Ring */}
//             <circle r="20" fill="none" stroke={agent.status === 'FAILED' ? '#ef4444' : agent.status === 'EXECUTING' ? '#0ea5e9' : '#94a3b8'} strokeWidth="1.5" strokeDasharray="4,2" className={agent.status === 'EXECUTING' ? "animate-[spin_4s_linear_infinite]" : ""} />
            
//             {/* Agent Core */}
//             <circle r="14" fill="#18181b" stroke={agent.status === 'FAILED' ? '#ef4444' : agent.status === 'EXECUTING' ? '#0ea5e9' : '#94a3b8'} strokeWidth="2.5" filter={agent.status === 'EXECUTING' ? "url(#glow-primary)" : ""} />
//             <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-white tracking-widest">{agent.id.split('-')[1]}</text>
            
//             {/* Battery Warning Pulse */}
//             {agent.battery < 20 && agent.status !== 'FAILED' && (
//               <circle r="28" fill="none" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.8" className="animate-pulse-fast" filter="url(#glow-danger)" />
//             )}
//           </g>
//         ))}
//       </svg>
//     </div>
//   );
// }
