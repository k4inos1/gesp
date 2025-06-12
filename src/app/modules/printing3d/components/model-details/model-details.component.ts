import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit {
  modelId: string = '';
  model: any;
  selectedTab = 0;

  // Datos de ejemplo para un modelo específico
  modelData = {
    id: 'robot-educativo',
    name: 'Robot Educativo Modular',
    description: 'Un robot modular diseñado para enseñar conceptos básicos de robótica y programación. Incluye piezas intercambiables para diferentes configuraciones.',
    thumbnail: 'assets/images/printing3d/models/robot-educativo.jpg',
    images: [
      'assets/images/printing3d/models/robot-educativo-1.jpg',
      'assets/images/printing3d/models/robot-educativo-2.jpg',
      'assets/images/printing3d/models/robot-educativo-3.jpg',
      'assets/images/printing3d/models/robot-educativo-4.jpg'
    ],
    difficulty: 'Intermedio',
    printTime: '12 horas',
    material: 'PLA',
    designer: 'María Rodríguez',
    partsCount: 15,
    assemblyTime: '45 minutos',
    features: ['Articulado', 'Modular', 'Educativo', 'Programable'],
    downloads: 1250,
    rating: 4.7,
    category: 'Robótica',
    featured: true,
    dateAdded: '2025-05-15',
    printSettings: {
      nozzleTemp: '210°C',
      bedTemp: '60°C',
      layerHeight: '0.2mm',
      infill: '20%',
      supports: 'Sí, en algunas piezas',
      adhesion: 'Brim'
    },
    files: [
      { name: 'Robot_Educativo_STL.zip', size: '25MB', format: 'STL' },
      { name: 'Robot_Educativo_3MF.zip', size: '28MB', format: '3MF' },
      { name: 'Robot_Educativo_Source.zip', size: '45MB', format: 'Fusion 360' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Impresión de piezas base',
        description: 'Imprimir las piezas base del robot con 20% de relleno y soporte para voladizos.',
        image: 'assets/images/printing3d/models/robot-paso1.jpg'
      },
      {
        step: 2,
        title: 'Impresión de componentes móviles',
        description: 'Imprimir las articulaciones y componentes móviles con 30% de relleno para mayor resistencia.',
        image: 'assets/images/printing3d/models/robot-paso2.jpg'
      },
      {
        step: 3,
        title: 'Ensamblaje del cuerpo',
        description: 'Unir las piezas del cuerpo principal usando los conectores incluidos.',
        image: 'assets/images/printing3d/models/robot-paso3.jpg'
      },
      {
        step: 4,
        title: 'Instalación de componentes electrónicos',
        description: 'Instalar los componentes electrónicos opcionales siguiendo el diagrama.',
        image: 'assets/images/printing3d/models/robot-paso4.jpg'
      },
      {
        step: 5,
        title: 'Ensamblaje final',
        description: 'Conectar todas las partes y verificar el movimiento de las articulaciones.',
        image: 'assets/images/printing3d/models/robot-paso5.jpg'
      }
    ],
    relatedModels: [
      'brazo-robotico-educativo',
      'vehiculo-autonomo-stem',
      'drone-educativo-basico'
    ],
    comments: [
      {
        user: 'Carlos',
        date: '2025-05-20',
        rating: 5,
        comment: 'Excelente modelo para enseñar robótica básica. Mis estudiantes lo adoraron.'
      },
      {
        user: 'Laura',
        date: '2025-05-18',
        rating: 4,
        comment: 'Buenas instrucciones, aunque algunas piezas requirieron ajustes.'
      },
      {
        user: 'Miguel',
        date: '2025-05-16',
        rating: 5,
        comment: 'Perfecto para mi clase de tecnología. Fácil de imprimir y ensamblar.'
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.modelId = id ? id : '';
    // En un caso real, aquí cargaríamos los datos del modelo desde un servicio
    this.model = this.modelData;
  }

  goBack(): void {
    this.location.back();
  }

  downloadFile(file: any): void {
    // Aquí implementaríamos la lógica real de descarga
    alert(`Descargando archivo: ${file.name}`);
  }

  shareModel(): void {
    // Implementación de compartir en redes sociales
    alert('Compartiendo modelo en redes sociales');
  }

  reportIssue(): void {
    // Implementación para reportar problemas
    alert('Enviando reporte de problema');
  }

  addComment(): void {
    // Implementación para añadir comentarios
    alert('Funcionalidad para añadir comentarios');
  }
}
