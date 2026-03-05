export type Language = 'en' | 'hi' | 'mr' | 'ta';

export interface Patient {
  id: string;
  age: number;
  gender: string;
  education: string;
  diagnosis?: string;
  lang: Language;
  timestamp: string;
}

export type TrialType = 'somatic' | 'neutral' | 'color';
export type ColorType = 'red' | 'blue' | 'green' | 'yellow';

export interface Trial {
  word: string;
  color: ColorType;
  type: TrialType;
}

export interface TrialResult extends Trial {
  trial: number;
  phase: 'practice' | 'test';
  response: ColorType;
  correct: boolean;
  rt_ms: number;
}

export interface SessionStats {
  interference: number;
  rt_somatic: number;
  rt_neutral: number;
  rt_color: number;
  accuracy: number;
  total: number;
}

export interface Session {
  id: string;
  patient: Patient;
  stats: SessionStats;
  trials: TrialResult[];
  timestamp: string;
}
