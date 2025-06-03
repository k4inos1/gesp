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

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  dashboardLayout?: any[];
}
