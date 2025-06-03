export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userId: string;
  metadata?: Record<string, any>;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'system';

export interface NotificationPreferences {
  userId: string;
  email: boolean;
  push: boolean;
  desktop: boolean;
  types: {
    [key in NotificationType]: boolean;
  };
}
