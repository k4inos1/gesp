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

export interface ActivityLog {
  id: string;
  type: 'user' | 'project' | 'system';
  action: string;
  description: string;
  timestamp: Date;
  userId?: string;
  metadata?: Record<string, any>;
}
