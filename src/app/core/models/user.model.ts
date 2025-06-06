export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

export type UserRole = 'admin' | 'user' | 'manager';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface DashboardWidget {
  id: string;
  type: 'chart' | 'table' | 'stats' | 'activity' | 'custom';
  title: string;
  position: {
    x: number;
    y: number;
    cols: number;
    rows: number;
  };
  config?: Record<string, unknown>;
  isVisible: boolean;
  refreshRate?: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  dashboardLayout?: DashboardWidget[];
}
