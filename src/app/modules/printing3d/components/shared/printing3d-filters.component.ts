import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Difficulty, DifficultyLevels } from '../../../../shared/types/difficulty.type';
import { Printing3dFilters } from '../../services/printing3d-state.service';
import { PrintingCategory } from '../../models/printing.model';

@Component({
  selector: 'app-printing3d-filters',
  template: `
    <mat-card>
      <mat-card-content>
        <div class="search-filters-container">
          <!-- Search Box -->
          <div class="search-box">
            <mat-form-field appearance="outline">
              <mat-label>Buscar</mat-label>
              <input
                matInput
                [value]="filters.searchTerm"
                (keyup)="onSearchChange($event)"
                [placeholder]="searchPlaceholder"
              />
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
          </div>

          <!-- Categories -->
          <div class="filter-group" *ngIf="categories?.length">
            <span class="filter-label">Categoría:</span>
            <mat-chip-set aria-label="Selección de categoría">              <mat-chip
                *ngFor="let category of categories"
                [highlighted]="filters.categories.includes(category.id)"
                (click)="toggleCategory(category.id)"
              >
                <mat-icon *ngIf="category.icon">{{category.icon}}</mat-icon>
                {{ category.name }}
              </mat-chip>
            </mat-chip-set>
          </div>

          <!-- Difficulty -->
          <div class="filter-group">
            <span class="filter-label">Dificultad:</span>
            <mat-chip-set aria-label="Selección de dificultad">              <mat-chip
                *ngFor="let difficulty of difficulties"
                [highlighted]="filters.difficulties.includes(difficulty)"
                (click)="toggleDifficulty(difficulty)"
              >
                {{ difficulty | titlecase }}
              </mat-chip>
            </mat-chip-set>
          </div>

          <!-- Sort Options -->
          <div class="sort-options">
            <mat-form-field appearance="outline">
              <mat-label>Ordenar por</mat-label>
              <mat-select
                [value]="filters.sortBy"
                (selectionChange)="onSortChange($event)"
              >
                <mat-option *ngFor="let option of sortOptions" [value]="option.value">
                  {{ option.label }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- Clear Filters -->
          <button
            mat-button
            color="primary"
            (click)="clearFilters()"
            *ngIf="hasActiveFilters"
          >
            <mat-icon>clear</mat-icon> Limpiar filtros
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./printing3d-filters.component.scss']
})
export class Printing3dFiltersComponent {
  @Input() filters!: Printing3dFilters;
  @Input() categories: PrintingCategory[] = [];
  @Input() searchPlaceholder = 'Buscar...';
  @Output() filtersChange = new EventEmitter<Partial<Printing3dFilters>>();

  difficulties = DifficultyLevels;

  sortOptions = [
    { value: 'popular', label: 'Más populares' },
    { value: 'rating', label: 'Mejor valorados' },
    { value: 'newest', label: 'Más recientes' },
    { value: 'name', label: 'Nombre' },
    { value: 'printTime', label: 'Tiempo de impresión' }
  ];

  get hasActiveFilters(): boolean {
    return (
      this.filters.categories.length > 0 ||
      this.filters.difficulties.length > 0 ||
      !!this.filters.searchTerm ||
      this.filters.sortBy !== 'popular'
    );
  }

  onSearchChange(event: any): void {
    this.filtersChange.emit({ searchTerm: event.target.value });
  }

  toggleCategory(categoryId: string): void {
    const categories = [...this.filters.categories];
    const index = categories.indexOf(categoryId);
    
    if (index === -1) {
      categories.push(categoryId);
    } else {
      categories.splice(index, 1);
    }

    this.filtersChange.emit({ categories });
  }

  toggleDifficulty(difficulty: Difficulty): void {
    const difficulties = [...this.filters.difficulties];
    const index = difficulties.indexOf(difficulty);
    
    if (index === -1) {
      difficulties.push(difficulty);
    } else {
      difficulties.splice(index, 1);
    }

    this.filtersChange.emit({ difficulties });
  }

  onSortChange(event: any): void {
    this.filtersChange.emit({ 
      sortBy: event.value,
      sortOrder: event.value === 'name' ? 'asc' : 'desc'
    });
  }

  clearFilters(): void {
    this.filtersChange.emit({
      categories: [],
      difficulties: [],
      searchTerm: '',
      sortBy: 'popular',
      sortOrder: 'desc'
    });
  }
}
