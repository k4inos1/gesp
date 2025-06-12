import { Component, OnInit } from '@angular/core';

interface Phase {
  id: string;
  title: string;
  color: string;
  duration: string;
  tasks: string[];
}

interface Methodology {
  tipo: string;
  herramientas: string[];
  objetivo: string;
}

interface Indicator {
  categoria: string;
  metricas: string[];
}

@Component({
  selector: 'app-plan-investigation',
  templateUrl: './plan-investigation.component.html',
  styleUrls: ['./plan-investigation.component.scss']
})
export class PlanInvestigationComponent implements OnInit {
  activeTab: string = 'overview';
  selectedIndex: number = 0;
  completedTasks: { [key: string]: boolean } = {};

  phases: Phase[] = [
    {
      id: 'diagnostico',
      title: 'Diagnóstico y Validación PMV',
      color: 'primary',
      duration: '3-4 semanas',
      tasks: [
        'Mapear necesidades tecnológicas locales (PYMEs, emprendedores)',
        'Identificar brechas en educación maker actual',
        'Validar demanda de prototipos funcionales con usuarios reales',
        'Analizar infraestructura disponible en INACAP'
      ]
    },
    {
      id: 'competencia',
      title: 'Análisis de Competencia y Benchmarking',
      color: 'accent',
      duration: '2-3 semanas',
      tasks: [
        'Investigar otros espacios maker en Chile (universidades, centros)',
        'Analizar modelos PMV exitosos en educación técnica',
        'Benchmarking internacional de programas maker-empresa',
        'Identificar diferenciadores clave'
      ]
    },
    {
      id: 'stakeholders',
      title: 'Mapeo de Stakeholders y Aliados',
      color: 'warn',
      duration: '2 semanas',
      tasks: [
        'Identificar PYMEs interesadas en colaborar',
        'Mapear empresas tecnológicas para sponsorships',
        'Contactar liceos TP para vinculación',
        'Explorar fondos concursables disponibles'
      ]
    },
    {
      id: 'validacion',
      title: 'Validación con Usuarios',
      color: 'primary',
      duration: '4-5 semanas',
      tasks: [
        'Encuestas a estudiantes INACAP sobre interés maker',
        'Entrevistas con docentes sobre viabilidad pedagógica',
        'Focus groups con empresarios locales',
        'Testeo de conceptos de prototipos PMV'
      ]
    }
  ];

  metodologias: Methodology[] = [
    {
      tipo: "Investigación Cuantitativa",
      herramientas: ["Encuestas online (Google Forms)", "Análisis estadístico con R/Python", "Métricas de engagement"],
      objetivo: "Validar demanda y dimensionar mercado potencial"
    },
    {
      tipo: "Investigación Cualitativa",
      herramientas: ["Entrevistas en profundidad", "Focus groups presenciales", "Observación etnográfica"],
      objetivo: "Entender motivaciones y barreras de adopción"
    },
    {
      tipo: "Prototipado Rápido",
      herramientas: ["Talleres de co-creación", "PMV de 2 semanas", "Testing con usuarios reales"],
      objetivo: "Validar funcionalidad y ajustar propuesta"
    }
  ];

  indicadores: Indicator[] = [
    { categoria: "Demanda", metricas: ["% de estudiantes interesados", "N° de PYMEs dispuestas a colaborar", "Nivel de apoyo docente"] },
    { categoria: "Viabilidad", metricas: ["Costo por prototipo", "Tiempo de desarrollo", "Recursos necesarios"] },
    { categoria: "Impacto", metricas: ["Satisfacción usuarios finales", "Funcionalidad de prototipos", "Empleabilidad generada"] }
  ];

  tabs = [
    { id: 'overview', label: 'Visión General', icon: 'target' },
    { id: 'phases', label: 'Fases y Cronograma', icon: 'calendar_today' },
    { id: 'methodology', label: 'Metodologías', icon: 'settings' },
    { id: 'indicators', label: 'Indicadores', icon: 'bar_chart' },
    { id: 'pmv', label: 'Integración PMV', icon: 'lightbulb' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.selectedIndex = this.tabs.findIndex(tab => tab.id === this.activeTab);
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
    this.selectedIndex = this.tabs.findIndex(tab => tab.id === tabId);
  }

  toggleTask(taskId: string): void {
    this.completedTasks[taskId] = !this.completedTasks[taskId];
  }

  /**
   * Maneja el evento de tecla Enter para marcar tareas como completadas
   * @param event - Evento de teclado
   * @param taskId - ID de la tarea a la que se aplica la acción
   */
  public onKeyup(event: Event, taskId: string): void {
    // Prevenir el comportamiento por defecto
    event.preventDefault();
    event.stopPropagation();
    
    // Ejecutar la acción de toggle
    this.toggleTask(taskId);
  }

  isTaskCompleted(taskId: string): boolean {
    return this.completedTasks[taskId] || false;
  }

  getColorClass(color: string): string {
    switch(color) {
      case 'primary': return 'mat-primary';
      case 'accent': return 'mat-accent';
      case 'warn': return 'mat-warn';
      default: return '';
    }
  }

  getBackgroundClass(color: string): string {
    switch(color) {
      case 'primary': return 'bg-primary';
      case 'accent': return 'bg-accent';
      case 'warn': return 'bg-warn';
      default: return '';
    }
  }
}
