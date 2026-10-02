export interface DecisionLog {
  id: string;
  tick: number;
  triggerEvent: string;
  optionsConsidered: number;
  chosenAction: string;
  confidence: number;
  rationale: string;
}

export interface Escalation {
  id: string;
  tick: number;
  context: string;
  options: { id: string; description: string; aiRecommended: boolean }[];
  status: 'PENDING' | 'RESOLVED' | 'TIMEOUT';
}

export const DecisionLog = {};
export const Escalation = {};
export const _ENGINE = 1;
