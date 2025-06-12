import { Component, OnInit } from '@angular/core';
import { PrintingTutorial } from '../../models/printing.model';
import { Printing3dService } from '../../services/printing3d.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-printing3d-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class Printing3dTutorialsComponent implements OnInit {
  tutorials: PrintingTutorial[] = [];
  filteredTutorials: PrintingTutorial[] = [];
  difficultyFilters: Array<'básico' | 'intermedio' | 'avanzado'> = [];
  searchTerm = '';
  sortOption = 'newest';
  isLoading = false;

  constructor(
    private printing3dService: Printing3dService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTutorials();
  }

  private loadTutorials(): void {
    this.isLoading = true;
    this.printing3dService.getTutorials().subscribe({
      next: (response) => {
        this.tutorials = response.data;
        this.filteredTutorials = this.tutorials;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.showError('Error al cargar los tutoriales');
        this.isLoading = false;
      }
    });
  }

  toggleDifficultyFilter(difficulty: 'básico' | 'intermedio' | 'avanzado'): void {
    const index = this.difficultyFilters.indexOf(difficulty);
    if (index === -1) {
      this.difficultyFilters.push(difficulty);
    } else {
      this.difficultyFilters.splice(index, 1);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTutorials = this.tutorials.filter(tutorial => {
      if (this.difficultyFilters.length > 0 && !this.difficultyFilters.includes(tutorial.difficulty)) {
        return false;
      }
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        return tutorial.title.toLowerCase().includes(searchLower) ||
               tutorial.description.toLowerCase().includes(searchLower);
      }
      return true;
    });
    this.sortTutorials();
  }

  sortTutorials(): void {
    switch (this.sortOption) {
      case 'newest':
        this.filteredTutorials.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'title':
        this.filteredTutorials.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'difficulty': {
        const difficultyOrder = { 'básico': 0, 'intermedio': 1, 'avanzado': 2 };
        this.filteredTutorials.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      }

    }
  }

  updateSearch(): void {
    this.applyFilters();
  }

  updateSort(): void {
    this.sortTutorials();
  }

  clearFilters(): void {
    this.difficultyFilters = [];
    this.searchTerm = '';
    this.sortOption = 'newest';
    this.filteredTutorials = this.tutorials;
    this.sortTutorials();
  }
}
