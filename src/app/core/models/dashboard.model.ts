export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  activeProjects: number;
  systemHealth: SystemHealth;
  recentActivity: ActivityLog[];
}

export interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  status: 'healthy' | 'warning' | 'critical';
}

export interface ActivityLogMetadata {
  // Propiedades comunes para metadata de actividad
  entityId?: string;
  entityType?: string;
  oldValue?: string | number | boolean | null;
  newValue?: string | number | boolean | null;
  // Permite propiedades adicionales con valores primitivos o arrays de primitivos
  [key: string]: string | number | boolean | string[] | number[] | boolean[] | null | undefined;
}

export interface ActivityLog {
  id: string;
  type: 'user' | 'project' | 'system';
  action: string;
  description: string;
  timestamp: Date;
  userId?: string;
  metadata?: ActivityLogMetadata;
}
