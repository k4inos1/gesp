import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {
  // Columnas para la tabla de roadmap
  displayedColumns: string[] = ['year', 'goal', 'expectedResult'];
  
  // Datos del roadmap
  roadmapData = [
    { year: '2025', goal: 'Piloto validado', expectedResult: 'Talleres básicos, 3 prototipos funcionales, 1 feria maker local' },
    { year: '2026', goal: 'Expansión institucional', expectedResult: 'Replicación en 2 sedes INACAP, guía de implementación publicada' },
    { year: '2027', goal: 'Escalamiento regional', expectedResult: 'Red de colaboración con liceos TP y empresas locales' },
    { year: '2028', goal: 'Reconocimiento nacional', expectedResult: 'Participación en iniciativas del Ministerio de Educación y CORFO' },
    { year: '2029', goal: 'Comunidad autosostenida', expectedResult: 'Comunidad maker INACAP con mentoría intergeneracional y spin-offs estudiantiles' }
  ];
  
  // Datos de diagnóstico inicial
  diagnosticData = {
    title: 'Diagnóstico Inicial y Justificación',
    gapDetected: 'Falta de acceso a formación práctica en tecnología emergente y uso efectivo de infraestructura ya instalada.',
    regionalDemand: 'Necesidades tecnológicas no cubiertas en el entorno (automatización agrícola, domótica, manufactura local).',
    territorialVocation: 'Articulación con marcos como la Estrategia Nacional de Formación Técnico Profesional, Política de Innovación Regional, o Transformación Digital.'
  };
  
  // Datos del enfoque pedagógico
  pedagogicalApproach = {
    title: 'Enfoque Pedagógico Maker',
    approaches: [
      'Aprendizaje Basado en Proyectos (PBL) y Aprendizaje Basado en Retos (CBL).',
      'Aprendizaje entre pares (peer learning): estudiantes avanzados capacitan a otros.',
      'Evaluación auténtica: rubricas por proyecto, presentaciones públicas, portafolios digitales (GitHub, Instructables).',
      'Inclusión educativa: estrategias para integrar a mujeres, estudiantes con NEE o comunidades subrepresentadas en STEM.'
    ]
  };
  
  // Datos de formación docente
  teacherTraining = {
    title: 'Estrategia de Formación Continua Docente',
    strategies: [
      'Crear un "Círculo de Innovación Docente Maker": formación en cascada, recursos compartidos, mentoría entre instructores.',
      'Cursos asincrónicos o mixtos (blended learning) para asegurar acceso sostenido.'
    ]
  };
  
  // Datos de vinculación con el medio
  environmentalLinkage = {
    title: 'Vinculación con el Medio y Empleabilidad',
    strategies: [
      'Reto semestral INACAP-PYME: cada semestre, una empresa local lanza un desafío real para resolver con prototipos.',
      'Portafolio Maker del estudiante: proyectos que puedan mostrar en entrevistas o usar como MVP para emprendimiento.',
      'Vinculación con liceos TP: incluirlos en actividades abiertas o pasantías en espacios maker.'
    ]
  };
  
  // Datos de comunidad de práctica
  communityOfPractice = {
    title: 'Comunidad de Práctica y Escalabilidad Nacional',
    elements: [
      'Repositorio de proyectos.',
      'Manuales de replicación de talleres.',
      'Base de conocimientos abierta.',
      'Comunidad Discord/Telegram/Foro interno.',
      'Participación en eventos nacionales (e.g., Congreso Futuro, Semana TP, ferias de ciencia) o crear un "Festival Maker INACAP" anual.'
    ]
  };
  
  // Datos de sostenibilidad financiera
  financialSustainability = {
    title: 'Sostenibilidad y Escalamiento Financiero',
    phases: [
      { phase: 'Fase 1 (Piloto)', description: 'Fondos institucionales y concursables (Fondo Acelera, CORFO).' },
      { phase: 'Fase 2 (Crecimiento)', description: 'Alianzas con empresas tecnológicas (donaciones, sponsorships).' },
      { phase: 'Fase 3 (Consolidación)', description: 'Servicios a terceros, spin-offs estudiantiles, fondos internacionales (Erasmus+, BID Lab, etc.).' }
    ]
  };
  
  // Datos de certificación modular
  modularCertification = {
    title: 'Certificación Modular',
    certificates: [
      'Certificado en Fabricación Digital',
      'Certificado en Prototipado con IoT',
      'Certificado en Emprendimiento Maker'
    ],
    description: 'Esto aumenta la empleabilidad e incluso puede conectarse con futuros diplomados o mallas curriculares.'
  };

  constructor() { }

  ngOnInit(): void {
  }
}
