import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maker-iot-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class MakerIotOverviewComponent implements OnInit {
  // Datos del proyecto
  projectTitle = 'Propuesta Piloto Educativo: Maker e IoT de Bajo Costo';
  
  // Objetivos del proyecto
  objectives = [
    {
      title: 'Aprendizaje práctico ("aprender haciendo")',
      description: 'Promover el conocimiento mediante proyectos reales. La impresión 3D permite manipular objetos y comprender conceptos complejos. Los makerspaces motivan la creatividad y la resolución de problemas reales.',
      icon: 'school'
    },
    {
      title: 'Fomento de la creatividad e innovación',
      description: 'Estimular el diseño e innovación con tecnología de bajo costo. La impresión 3D impulsa el pensamiento creativo al convertir ideas en objetos físicos.',
      icon: 'lightbulb'
    },
    {
      title: 'Cultura emprendedora y vinculación local',
      description: 'Fomentar el espíritu emprendedor técnico a través de proyectos aplicados a la comunidad o PYMEs locales. Los prototipos pueden transformarse en soluciones reales (ej. sistemas agrícolas inteligentes).',
      icon: 'business'
    },
    {
      title: 'Uso de tecnologías libres y sostenibles',
      description: 'Favorecer software y hardware de código abierto para reducir costos. Facilita la escalabilidad sin depender de infraestructura costosa.',
      icon: 'eco'
    },
    {
      title: 'Trabajo colaborativo y multidisciplinario',
      description: 'Formar equipos de estudiantes de distintas carreras técnicas y docentes. Crear una cultura de colaboración en espacios maker compartidos.',
      icon: 'groups'
    }
  ];
  
  // Público beneficiario
  beneficiaries = [
    'Estudiantes técnicos de INACAP: Carreras como Ingeniería, Electricidad, Mecatrónica, Diseño, Electrónica, Telecomunicaciones, etc.',
    'Docentes técnicos: Capacitación en pedagogía maker, IoT e impresión 3D.',
    'PYMEs y emprendedores locales: Invitación a plantear desafíos reales.',
    'Comunidad educativa ampliada: Talleres abiertos a vecinos, liceos técnicos y asociaciones de innovación.'
  ];
  
  // Talleres disponibles
  workshops = [
    {
      title: 'Taller de Diseño e Impresión 3D',
      description: 'Introducción a CAD (FreeCAD, Blender, Tinkercad). Uso de impresoras FDM y slicers libres (Cura).',
      icon: 'view_in_ar',
      route: '/maker-iot/3d-printing'
    },
    {
      title: 'Taller IoT y Sensórica',
      description: 'Uso de Arduino y Raspberry Pi. Programación con Node-RED, MQTT y plataformas libres.',
      icon: 'sensors',
      route: '/maker-iot/iot-sensors'
    },
    {
      title: 'Taller de Programación y Electrónica Básica',
      description: 'Programación en Python, Scratch, Arduino IDE. Simulación de circuitos en sala de computación.',
      icon: 'code',
      route: '/maker-iot/programming'
    },
    {
      title: 'Taller de Emprendimiento Tecnológico',
      description: 'Validación de ideas, modelos de negocio lean, microemprendimientos tecnológicos.',
      icon: 'trending_up',
      route: '/maker-iot/entrepreneurship'
    }
  ];
  
  // Tecnologías recomendadas
  technologies = [
    {
      category: 'Modelado 3D',
      tools: ['FreeCAD', 'Blender', 'Tinkercad', 'Cura']
    },
    {
      category: 'IoT y Electrónica',
      tools: ['Arduino', 'Raspberry Pi', 'Node-RED', 'MQTT', 'KiCad', 'OpenHAB']
    },
    {
      category: 'Programación',
      tools: ['Python', 'JavaScript', 'MicroPython', 'Scratch']
    },
    {
      category: 'Entornos de desarrollo',
      tools: ['Arduino IDE', 'VSCode', 'Geany', 'Linux']
    },
    {
      category: 'Recursos educativos',
      tools: ['Thingiverse', 'Instructables', 'GitHub', 'Moodle', 'Google Classroom']
    }
  ];
  
  // Estadísticas del proyecto (simuladas)
  stats = [
    { label: 'Estudiantes Participantes', value: 120, icon: 'people' },
    { label: 'Proyectos Completados', value: 45, icon: 'assignment_turned_in' },
    { label: 'Talleres Realizados', value: 24, icon: 'event' },
    { label: 'Alianzas con Empresas', value: 8, icon: 'handshake' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
