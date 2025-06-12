import { BaseEntity } from '../../../shared/models/base.model';
import { Difficulty } from '../../../shared/types/difficulty.type';

export interface PrintingCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface PrintingMaterial {
  id: string;
  name: string;
  type: string;
  color: string;
  description: string;
  recommendedTemperature: {
    bed: number;
    nozzle: number;
  };
}

export interface PrintingModel extends BaseEntity {
  name: string;
  description: string;
  fileUrl: string;
  thumbnailUrl: string;
  category: PrintingCategory;
  printTime: string;
  material: PrintingMaterial;
  difficulty: Difficulty;
  designer?: {
    name: string;
    url?: string;
  };
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: 'mm' | 'cm' | 'in';
  };
  parts?: {
    count: number;
    list: Array<{
      name: string;
      quantity: number;
      printTime: string;
    }>;
  };
  assemblyTime?: string;
  features: string[];
  downloads: number;
  rating: {
    average: number;
    count: number;
  };
  featured: boolean;
  tags: string[];
  views: number;
  requirements?: {
    printer?: string[];
    nozzleSize?: string;
    supports?: boolean;
    rafts?: boolean;
  };
  slicerSettings?: {
    infill: number;
    layerHeight: number;
    wallThickness: number;
  };
}

export interface PrintingTutorial extends BaseEntity {
  title: string;
  description: string;
  content: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  difficulty: Difficulty;
  estimatedTime: number; // Time in minutes
  duration: {
    value: number;
    unit: 'minutes' | 'hours';
  };
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  prerequisites?: string[];
  materials?: Array<{
    name: string;
    quantity?: string;
    required: boolean;
  }>;
  steps: Array<{
    title: string;
    description: string;
    imageUrl?: string;
    duration?: number;
  }>;
  likes: number;
  views: number;
  category: string[];
  tags: string[];
}
