import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Difficulty } from '../../../shared/types/difficulty.type';

export interface Printing3dFilters {
  categories: string[];
  difficulties: Difficulty[];
  searchTerm: string;
  sortBy: 'popular' | 'rating' | 'newest' | 'name' | 'printTime';
  sortOrder: 'asc' | 'desc';
}

const DEFAULT_FILTERS: Printing3dFilters = {
  categories: [],
  difficulties: [],
  searchTerm: '',
  sortBy: 'popular',
  sortOrder: 'desc'
};

@Injectable({
  providedIn: 'root'
})
export class Printing3dStateService {
  private filters = new BehaviorSubject<Printing3dFilters>(DEFAULT_FILTERS);
  private loading = new BehaviorSubject<boolean>(false);

  filters$ = this.filters.asObservable();
  loading$ = this.loading.asObservable();

  updateFilters(filters: Partial<Printing3dFilters>): void {
    this.filters.next({
      ...this.filters.getValue(),
      ...filters
    });
  }

  resetFilters(): void {
    this.filters.next(DEFAULT_FILTERS);
  }

  getCurrentFilters(): Printing3dFilters {
    return this.filters.getValue();
  }

  setLoading(isLoading: boolean): void {
    this.loading.next(isLoading);
  }
}
