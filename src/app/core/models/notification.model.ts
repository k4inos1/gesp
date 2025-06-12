export interface NotificationMetadata {
  // Propiedades comunes del metadata
  actionUrl?: string;
  source?: string;
  priority?: 'low' | 'medium' | 'high';
  // Permite propiedades adicionales con valores primitivos
  [key: string]: string | number | boolean | undefined;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userId: string;
  metadata?: NotificationMetadata;
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
