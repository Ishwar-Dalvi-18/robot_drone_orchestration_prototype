export const MAP_DATA = {
  bounds: { width: 1000, height: 1000 },
  baseStation: { x: 50, y: 50 },
  hospital: { x: 800, y: 600 },
  substation: { x: 300, y: 800 },
  zones: [
    { id: 'Z-1', type: 'flood', bounds: { x: 100, y: 100, w: 300, h: 200 }, severity: 'high' },
    { id: 'Z-2', type: 'flood', bounds: { x: 500, y: 200, w: 200, h: 300 }, severity: 'medium' },
    { id: 'Z-3', type: 'valley', bounds: { x: 350, y: 350, w: 250, h: 250 }, description: 'Comms dead-zone' },
  ],
  obstacles: [
    { id: 'O-1', type: 'blocked_road', location: { x: 400, y: 150 }, radius: 20 },
    { id: 'O-2', type: 'collapsed_bridge', location: { x: 450, y: 500 }, radius: 30 },
  ],
  weather: {
    windZones: [
      { id: 'W-1', location: { x: 200, y: 700 }, radius: 200, intensity: 60 } // high wind
    ]
  }
};
