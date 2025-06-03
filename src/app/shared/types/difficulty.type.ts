export type Difficulty = 'básico' | 'intermedio' | 'avanzado';

export const DifficultyLevels: Difficulty[] = ['básico', 'intermedio', 'avanzado'];

export interface DifficultyConfig {
  label: string;
  value: Difficulty;
  color: string;
  icon: string;
}

export const DifficultyConfigs: Record<Difficulty, DifficultyConfig> = {
  'básico': {
    label: 'Básico',
    value: 'básico',
    color: '#2e7d32',
    icon: 'school'
  },
  'intermedio': {
    label: 'Intermedio',
    value: 'intermedio',
    color: '#f57c00',
    icon: 'trending_up'
  },
  'avanzado': {
    label: 'Avanzado',
    value: 'avanzado',
    color: '#c62828',
    icon: 'psychology'
  }
};
