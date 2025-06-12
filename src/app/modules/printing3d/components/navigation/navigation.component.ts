import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-printing3d-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class Printing3dNavigationComponent {
  navLinks = [
    { 
      path: 'overview', 
      label: 'Visión General', 
      icon: 'home',
      description: 'Introducción a la impresión 3D y su aplicación en educación'
    },
    { 
      path: 'tutorials', 
      label: 'Tutoriales', 
      icon: 'school',
      description: 'Guías paso a paso para aprender impresión 3D'
    },
    { 
      path: 'models', 
      label: 'Modelos 3D', 
      icon: 'view_in_ar',
      description: 'Biblioteca de modelos educativos listos para imprimir'
    },
    { 
      path: 'resources', 
      label: 'Recursos', 
      icon: 'library_books',
      description: 'Software, materiales y comunidades de impresión 3D'
    }
  ];

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url.includes(`/printing3d/${path}`);
  }

  navigateTo(path: string): void {
    this.router.navigate(['/printing3d', path]);
  }
}
