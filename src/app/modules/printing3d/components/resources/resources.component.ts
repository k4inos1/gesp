import { Component } from '@angular/core';

@Component({
  selector: 'app-printing3d-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class Printing3dResourcesComponent {
  resources = {
    software: [
      {
        name: 'TinkerCAD',
        description: 'Herramienta de diseño 3D basada en navegador, ideal para principiantes y uso educativo.',
        url: 'https://www.tinkercad.com',
        free: true,
        beginner: true,
        logo: 'assets/images/printing3d/resources/tinkercad.png',
        categories: ['diseño', 'educativo'],
        platforms: ['web']
      },
      {
        name: 'Fusion 360',
        description: 'Software de diseño CAD/CAM/CAE para modelado 3D profesional con licencia educativa gratuita.',
        url: 'https://www.autodesk.com/products/fusion-360',
        free: 'educativo',
        beginner: false,
        logo: 'assets/images/printing3d/resources/fusion360.png',
        categories: ['diseño', 'ingeniería'],
        platforms: ['windows', 'mac']
      },
      {
        name: 'Blender',
        description: 'Software de código abierto para modelado 3D, animación, texturizado y más.',
        url: 'https://www.blender.org',
        free: true,
        beginner: false,
        logo: 'assets/images/printing3d/resources/blender.png',
        categories: ['diseño', 'artístico'],
        platforms: ['windows', 'mac', 'linux']
      },
      {
        name: 'Cura',
        description: 'Software de laminado (slicing) de código abierto para preparar modelos para impresión 3D.',
        url: 'https://ultimaker.com/software/ultimaker-cura',
        free: true,
        beginner: true,
        logo: 'assets/images/printing3d/resources/cura.png',
        categories: ['laminado'],
        platforms: ['windows', 'mac', 'linux']
      },
      {
        name: 'PrusaSlicer',
        description: 'Software de laminado con configuraciones optimizadas para impresoras Prusa y otras.',
        url: 'https://www.prusa3d.com/prusaslicer/',
        free: true,
        beginner: true,
        logo: 'assets/images/printing3d/resources/prusaslicer.png',
        categories: ['laminado'],
        platforms: ['windows', 'mac', 'linux']
      },
      {
        name: 'OpenSCAD',
        description: 'Software para crear modelos 3D sólidos mediante programación, ideal para diseños paramétricos.',
        url: 'https://www.openscad.org',
        free: true,
        beginner: false,
        logo: 'assets/images/printing3d/resources/openscad.png',
        categories: ['diseño', 'programación'],
        platforms: ['windows', 'mac', 'linux']
      }
    ],
    
    educationalResources: [
      {
        name: 'Instructables - Impresión 3D',
        description: 'Tutoriales y proyectos paso a paso sobre impresión 3D para todos los niveles.',
        url: 'https://www.instructables.com/classes/3D-Printing-Class/',
        type: 'tutoriales',
        free: true,
        logo: 'assets/images/printing3d/resources/instructables.png'
      },
      {
        name: 'Thingiverse Education',
        description: 'Colección de proyectos educativos y planes de lecciones para impresión 3D en el aula.',
        url: 'https://www.thingiverse.com/education',
        type: 'proyectos',
        free: true,
        logo: 'assets/images/printing3d/resources/thingiverse.png'
      },
      {
        name: 'Curso de Diseño e Impresión 3D para Educadores',
        description: 'Curso completo para profesores sobre cómo integrar la impresión 3D en el currículo.',
        url: 'https://www.coursera.org/learn/3d-printing-curriculum',
        type: 'curso',
        free: false,
        logo: 'assets/images/printing3d/resources/coursera.png'
      },
      {
        name: 'GrabCAD - Biblioteca de modelos 3D',
        description: 'Comunidad de ingenieros, diseñadores y estudiantes que comparten modelos 3D.',
        url: 'https://grabcad.com',
        type: 'biblioteca',
        free: true,
        logo: 'assets/images/printing3d/resources/grabcad.png'
      },
      {
        name: 'YouTube - Canal Maker\'s Muse',
        description: 'Canal educativo con tutoriales, revisiones y consejos sobre impresión 3D.',
        url: 'https://www.youtube.com/channel/UCxQbYGpbdrh-b2ND-AfIybg',
        type: 'videos',
        free: true,
        logo: 'assets/images/printing3d/resources/makersmuse.png'
      }
    ],
    
    materials: [
      {
        name: 'Guía de Materiales para Impresión 3D en Educación',
        description: 'Guía completa sobre los diferentes materiales de impresión 3D y sus aplicaciones educativas.',
        url: 'https://www.simplify3d.com/resources/materials-guide/',
        type: 'guía',
        free: true,
        logo: 'assets/images/printing3d/resources/simplify3d.png'
      },
      {
        name: 'Filamentos PLA Ecológicos para Educación',
        description: 'Filamentos PLA biodegradables y seguros para uso en entornos educativos.',
        url: 'https://www.filamentive.com/pla-for-education/',
        type: 'producto',
        free: false,
        logo: 'assets/images/printing3d/resources/filamentive.png'
      },
      {
        name: 'Kit de Materiales de Muestra para Aulas',
        description: 'Kit con muestras de diferentes materiales de impresión 3D para demostraciones en clase.',
        url: 'https://www.matterhackers.com/store/c/sample-packs',
        type: 'producto',
        free: false,
        logo: 'assets/images/printing3d/resources/matterhackers.png'
      }
    ],
    
    communities: [
      {
        name: 'Reddit - r/3DPrinting',
        description: 'Comunidad activa donde compartir proyectos, resolver dudas y aprender sobre impresión 3D.',
        url: 'https://www.reddit.com/r/3Dprinting/',
        members: '500k+',
        logo: 'assets/images/printing3d/resources/reddit.png'
      },
      {
        name: 'Foro de Impresión 3D para Educadores',
        description: 'Foro especializado para profesores que utilizan impresión 3D en sus aulas.',
        url: 'https://educators.makerbot.com/forum',
        members: '10k+',
        logo: 'assets/images/printing3d/resources/makerbot.png'
      },
      {
        name: 'Discord - 3D Printing',
        description: 'Servidor de Discord con canales para diferentes aspectos de la impresión 3D.',
        url: 'https://discord.gg/3dprinting',
        members: '50k+',
        logo: 'assets/images/printing3d/resources/discord.png'
      }
    ]
  };

  // Categorías de software para filtrado
  softwareCategories = ['diseño', 'laminado', 'educativo', 'ingeniería', 'artístico', 'programación'];
  selectedCategories: string[] = [];
  
  // Plataformas para filtrado
  platforms = ['windows', 'mac', 'linux', 'web'];
  selectedPlatforms: string[] = [];
  
  // Tipos de recursos educativos para filtrado
  resourceTypes = ['tutoriales', 'proyectos', 'curso', 'biblioteca', 'videos'];
  selectedResourceTypes: string[] = [];
  
  // Filtro para mostrar solo recursos gratuitos
  onlyFree: boolean = false;
  
  // Filtro para nivel principiante
  onlyBeginner: boolean = false;
  
  // Término de búsqueda
  searchTerm: string = '';
  
  // Métodos para filtrado
  
  toggleCategoryFilter(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }
  
  togglePlatformFilter(platform: string) {
    const index = this.selectedPlatforms.indexOf(platform);
    if (index === -1) {
      this.selectedPlatforms.push(platform);
    } else {
      this.selectedPlatforms.splice(index, 1);
    }
  }
  
  toggleResourceTypeFilter(type: string) {
    const index = this.selectedResourceTypes.indexOf(type);
    if (index === -1) {
      this.selectedResourceTypes.push(type);
    } else {
      this.selectedResourceTypes.splice(index, 1);
    }
  }
  
  toggleFreeFilter() {
    this.onlyFree = !this.onlyFree;
  }
  
  toggleBeginnerFilter() {
    this.onlyBeginner = !this.onlyBeginner;
  }
  
  updateSearch(event: any) {
    this.searchTerm = event.target.value;
  }
  
  clearFilters() {
    this.selectedCategories = [];
    this.selectedPlatforms = [];
    this.selectedResourceTypes = [];
    this.onlyFree = false;
    this.onlyBeginner = false;
    this.searchTerm = '';
  }
  
  // Métodos para filtrar los resultados
  
  filterSoftware() {
    return this.resources.software.filter(software => {
      // Filtro por categoría
      if (this.selectedCategories.length > 0 && 
          !software.categories.some(cat => this.selectedCategories.includes(cat))) {
        return false;
      }
      
      // Filtro por plataforma
      if (this.selectedPlatforms.length > 0 && 
          !software.platforms.some(plat => this.selectedPlatforms.includes(plat))) {
        return false;
      }
      
      // Filtro solo gratuitos
      if (this.onlyFree && software.free !== true) {
        return false;
      }
      
      // Filtro solo para principiantes
      if (this.onlyBeginner && !software.beginner) {
        return false;
      }
      
      // Filtro por término de búsqueda
      if (this.searchTerm && 
          !software.name.toLowerCase().includes(this.searchTerm.toLowerCase()) && 
          !software.description.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }
  
  filterEducationalResources() {
    return this.resources.educationalResources.filter(resource => {
      // Filtro por tipo de recurso
      if (this.selectedResourceTypes.length > 0 && 
          !this.selectedResourceTypes.includes(resource.type)) {
        return false;
      }
      
      // Filtro solo gratuitos
      if (this.onlyFree && !resource.free) {
        return false;
      }
      
      // Filtro por término de búsqueda
      if (this.searchTerm && 
          !resource.name.toLowerCase().includes(this.searchTerm.toLowerCase()) && 
          !resource.description.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }
  
  filterMaterials() {
    return this.resources.materials.filter(material => {
      // Filtro solo gratuitos
      if (this.onlyFree && !material.free) {
        return false;
      }
      
      // Filtro por término de búsqueda
      if (this.searchTerm && 
          !material.name.toLowerCase().includes(this.searchTerm.toLowerCase()) && 
          !material.description.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }
  
  filterCommunities() {
    return this.resources.communities.filter(community => {
      // Filtro por término de búsqueda
      if (this.searchTerm && 
          !community.name.toLowerCase().includes(this.searchTerm.toLowerCase()) && 
          !community.description.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }
  
  // Método para abrir enlaces externos
  openExternalLink(url: string) {
    window.open(url, '_blank');
  }
}
