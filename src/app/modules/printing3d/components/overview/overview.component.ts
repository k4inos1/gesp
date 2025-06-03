import { Component, OnInit } from '@angular/core';

interface PrinterType {
  name: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  icon: string;
}

interface Material {
  name: string;
  type: string;
  properties: {
    strength: number;
    flexibility: number;
    temperature: number;
    detail: number;
  };
  applications: string[];
  printingTemp: string;
  bedTemp: string;
}

interface Project {
  name: string;
  description: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  materials: string[];
  skills: string[];
  time: string;
  image?: string;
}

@Component({
  selector: 'app-printing3d-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class Printing3dOverviewComponent implements OnInit {
  
  printerTypes: PrinterType[] = [
    {
      name: 'FDM (Modelado por Deposición Fundida)',
      description: 'Tecnología que deposita material fundido capa por capa para crear objetos tridimensionales.',
      advantages: [
        'Bajo costo de entrada',
        'Amplia variedad de materiales',
        'Fácil mantenimiento',
        'Buena resistencia mecánica'
      ],
      disadvantages: [
        'Resolución limitada',
        'Acabado superficial con líneas visibles',
        'Velocidad moderada',
        'Requiere soportes para voladizos'
      ],
      applications: [
        'Prototipos funcionales',
        'Piezas mecánicas',
        'Proyectos educativos',
        'Objetos decorativos'
      ],
      icon: 'layers'
    },
    {
      name: 'SLA/MSLA (Estereolitografía)',
      description: 'Utiliza luz UV para curar resina líquida fotosensible capa por capa.',
      advantages: [
        'Alta resolución y detalle',
        'Excelente acabado superficial',
        'Buena precisión dimensional',
        'Ideal para piezas pequeñas y detalladas'
      ],
      disadvantages: [
        'Mayor costo que FDM',
        'Materiales más caros',
        'Post-procesamiento obligatorio',
        'Resinas tóxicas requieren precauciones'
      ],
      applications: [
        'Joyería',
        'Odontología',
        'Modelos detallados',
        'Prototipos visuales'
      ],
      icon: 'opacity'
    },
    {
      name: 'SLS (Sinterizado Selectivo por Láser)',
      description: 'Utiliza un láser para sinterizar polvo de material, fusionándolo capa por capa.',
      advantages: [
        'No requiere soportes',
        'Excelentes propiedades mecánicas',
        'Geometrías complejas posibles',
        'Buena precisión'
      ],
      disadvantages: [
        'Equipos muy costosos',
        'Alto consumo energético',
        'Acabado superficial granulado',
        'Requiere enfriamiento controlado'
      ],
      applications: [
        'Piezas funcionales industriales',
        'Componentes aeroespaciales',
        'Prototipos avanzados',
        'Producción a pequeña escala'
      ],
      icon: 'grain'
    }
  ];

  popularMaterials: Material[] = [
    {
      name: 'PLA',
      type: 'Termoplástico',
      properties: {
        strength: 3,
        flexibility: 1,
        temperature: 1,
        detail: 4
      },
      applications: [
        'Prototipos visuales',
        'Objetos decorativos',
        'Proyectos educativos',
        'Juguetes'
      ],
      printingTemp: '180-220°C',
      bedTemp: '20-60°C'
    },
    {
      name: 'ABS',
      type: 'Termoplástico',
      properties: {
        strength: 4,
        flexibility: 2,
        temperature: 4,
        detail: 3
      },
      applications: [
        'Piezas funcionales',
        'Componentes mecánicos',
        'Prototipos de uso',
        'Piezas para automóviles'
      ],
      printingTemp: '220-250°C',
      bedTemp: '90-110°C'
    },
    {
      name: 'PETG',
      type: 'Termoplástico',
      properties: {
        strength: 4,
        flexibility: 3,
        temperature: 3,
        detail: 4
      },
      applications: [
        'Contenedores de alimentos',
        'Piezas resistentes al agua',
        'Componentes mecánicos',
        'Prototipos funcionales'
      ],
      printingTemp: '230-250°C',
      bedTemp: '70-90°C'
    },
    {
      name: 'TPU',
      type: 'Elastómero',
      properties: {
        strength: 3,
        flexibility: 5,
        temperature: 2,
        detail: 2
      },
      applications: [
        'Piezas flexibles',
        'Protectores y fundas',
        'Juntas y sellos',
        'Calzado y accesorios'
      ],
      printingTemp: '220-250°C',
      bedTemp: '30-60°C'
    }
  ];

  featuredProjects: Project[] = [
    {
      name: 'Soporte para Smartphone con Altavoz Pasivo',
      description: 'Diseña e imprime un soporte para tu teléfono que amplifica el sonido sin necesidad de electricidad, utilizando principios acústicos.',
      difficulty: 'Básico',
      materials: ['PLA', 'PETG'],
      skills: ['Diseño 3D básico', 'Configuración de impresión', 'Acabado superficial'],
      time: '3-5 horas',
      image: 'assets/images/phone-stand.jpg'
    },
    {
      name: 'Maceta Inteligente con Sistema de Riego',
      description: 'Crea una maceta con sistema de auto-riego integrado y sensor de humedad para mantener tus plantas saludables.',
      difficulty: 'Intermedio',
      materials: ['PETG', 'TPU'],
      skills: ['Diseño 3D intermedio', 'Impresión multicapa', 'Integración con electrónica'],
      time: '8-12 horas',
      image: 'assets/images/smart-planter.jpg'
    },
    {
      name: 'Mini Brazo Robótico Articulado',
      description: 'Construye un brazo robótico completamente funcional con articulaciones móviles, controlado por servomotores y Arduino.',
      difficulty: 'Avanzado',
      materials: ['ABS', 'PETG', 'Nylon'],
      skills: ['Diseño mecánico avanzado', 'Tolerancias precisas', 'Ensamblaje complejo', 'Programación'],
      time: '20-30 horas',
      image: 'assets/images/robot-arm.jpg'
    }
  ];

  learningPath = [
    {
      level: 'Principiante',
      skills: [
        'Fundamentos de impresión 3D',
        'Uso de software de laminado básico',
        'Calibración de impresora',
        'Diseño 3D básico'
      ]
    },
    {
      level: 'Intermedio',
      skills: [
        'Optimización de parámetros de impresión',
        'Uso de materiales avanzados',
        'Diseño para fabricación aditiva',
        'Post-procesamiento y acabados'
      ]
    },
    {
      level: 'Avanzado',
      skills: [
        'Diseño mecánico complejo',
        'Impresión multicolor/multimaterial',
        'Creación de moldes y fundición',
        'Integración con electrónica y robótica'
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
