import { Component, OnInit } from '@angular/core';
import { PrintingModel } from '../../models/printing.model';
import { Printing3dService } from '../../services/printing3d.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-printing3d-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class Printing3dModelsComponent implements OnInit {
  models: PrintingModel[] = [];
  private _filteredModels: PrintingModel[] = [];

  get filteredModels(): PrintingModel[] {
    return this._filteredModels;
  }

  set filteredModels(value: PrintingModel[]) {
    this._filteredModels = value || [];
  }
  isLoading = false;
  searchTerm = '';
  sortOption = 'popular';
  categories = ['educativo', 'mecánico', 'electrónico', 'artístico'];
  difficulties: Array<'básico' | 'intermedio' | 'avanzado'> = ['básico', 'intermedio', 'avanzado'];
  selectedCategories: string[] = [];
  selectedDifficulties: Array<'básico' | 'intermedio' | 'avanzado'> = [];

  constructor(
    private printing3dService: Printing3dService,
    private notificationService: NotificationService
  ) {
    this.filteredModels = [];
  }

  hasFeaturedModels(): boolean {
    return this.filteredModels.some(model => model.featured);
  }

  get filteredModelsLength(): number {
    return this.filteredModels.length;
  }

  ngOnInit(): void {
    this.loadModels();
    this.filteredModels = this.models;
  }

  private loadModels(): void {
    this.isLoading = true;
    this.printing3dService.getModels().subscribe({
      next: (response) => {
        this.models = response.data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Error al cargar los modelos');
        this.isLoading = false;
      }
    });
  }

  toggleCategoryFilter(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.applyFilters();
  }

  toggleDifficultyFilter(difficulty: 'básico' | 'intermedio' | 'avanzado'): void {
    const index = this.selectedDifficulties.indexOf(difficulty);
    if (index === -1) {
      this.selectedDifficulties.push(difficulty);
    } else {
      this.selectedDifficulties.splice(index, 1);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    if (this.models) {
      this.filteredModels = this.models.filter(model => {

        if (this.selectedDifficulties.length > 0 && !this.selectedDifficulties.includes(model.difficulty)) {
          return false;
        }
        if (this.searchTerm) {
          const searchLower = this.searchTerm.toLowerCase();
          return model.name.toLowerCase().includes(searchLower) ||
                 model.description.toLowerCase().includes(searchLower);
        }
        return true;
      });
    } else {
      this.filteredModels = [];
    }
    this.sortModels();
  }

  sortModels(): void {
    switch (this.sortOption) {
      case 'popular':
        this.filteredModels.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
        break;

      case 'newest':
        this.filteredModels.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'alphabetical':
        this.filteredModels.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  updateSearch(): void {
    this.applyFilters();
  }

  updateSort(): void {
    this.sortModels();
  }

  clearFilters(): void {
    this.selectedCategories = [];
    this.selectedDifficulties = [];
    this.searchTerm = '';
    this.sortOption = 'popular';
    this.filteredModels = this.models;
    this.sortModels();
  }
}
