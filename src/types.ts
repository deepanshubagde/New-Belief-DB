export enum Phase {
  WELCOME = 0,
  GOAL = 1,
  DETECT_PROMPTS = 2,
  DETECT_SELECT = 3,
  DECODE = 4,
  DISSOLVE_LOGIC = 5,
  DISSOLVE_RELEASE = 6,
  DESIGN = 7,
  COMPLETE = 8,
}

export interface PromptGroup {
  cat: string;
  color: string;
  prompts: string[];
}

export interface DecodeData {
  when: string;
  whose: string;
  v: string;
  a: string;
  k: string;
  kLocation: string;
}

export interface DesignVAK {
  v: string;
  a: string;
  k: string;
}

export interface DesignRule {
  title: string;
  desc: string;
}

export interface ClearingState {
  phase: Phase;
  name: string;
  goal: string;
  answers: Record<string, string>;
  selectedBelief: string;
  customBelief: string;
  decodeData: DecodeData;
  intensityBefore: number;
  logicAnswers: Record<number, string>;
  intensityAfter: number;
  newBelief: string;
  designVAK: DesignVAK;
}
