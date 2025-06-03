import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PrintingModel, PrintingTutorial, PrintingCategory, PrintingMaterial } from '../models/printing.model';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { FilterParams, PaginatedResponse, ApiResponse } from '../../../shared/models/base.model';

@Injectable({
  providedIn: 'root'
})
export class Printing3dService {
  private readonly baseUrl = `${environment.apiUrl}/printing3d`;
  private modelsService: BaseHttpService<PrintingModel>;
  private tutorialsService: BaseHttpService<PrintingTutorial>;
  private categoriesService: BaseHttpService<PrintingCategory>;
  private materialsService: BaseHttpService<PrintingMaterial>;

  constructor(private http: HttpClient) {
    this.modelsService = new BaseHttpService<PrintingModel>(http, `${this.baseUrl}/models`);
    this.tutorialsService = new BaseHttpService<PrintingTutorial>(http, `${this.baseUrl}/tutorials`);
    this.categoriesService = new BaseHttpService<PrintingCategory>(http, `${this.baseUrl}/categories`);
    this.materialsService = new BaseHttpService<PrintingMaterial>(http, `${this.baseUrl}/materials`);
  }

  // Models
  getModels(params?: FilterParams): Observable<PaginatedResponse<PrintingModel[]>> {
    return this.modelsService.getAll(params);
  }

  getModelById(id: string): Observable<ApiResponse<PrintingModel>> {
    return this.modelsService.getById(id);
  }

  createModel(model: Partial<PrintingModel>): Observable<ApiResponse<PrintingModel>> {
    return this.modelsService.create(model);
  }

  updateModel(id: string, model: Partial<PrintingModel>): Observable<ApiResponse<PrintingModel>> {
    return this.modelsService.update(id, model);
  }

  deleteModel(id: string): Observable<ApiResponse<void>> {
    return this.modelsService.delete(id);
  }

  // Tutorials
  getTutorials(params?: FilterParams): Observable<PaginatedResponse<PrintingTutorial[]>> {
    return this.tutorialsService.getAll(params);
  }

  getTutorialById(id: string): Observable<ApiResponse<PrintingTutorial>> {
    return this.tutorialsService.getById(id);
  }

  createTutorial(tutorial: Partial<PrintingTutorial>): Observable<ApiResponse<PrintingTutorial>> {
    return this.tutorialsService.create(tutorial);
  }

  updateTutorial(id: string, tutorial: Partial<PrintingTutorial>): Observable<ApiResponse<PrintingTutorial>> {
    return this.tutorialsService.update(id, tutorial);
  }

  deleteTutorial(id: string): Observable<ApiResponse<void>> {
    return this.tutorialsService.delete(id);
  }

  // Categories
  getCategories(): Observable<PaginatedResponse<PrintingCategory[]>> {
    return this.categoriesService.getAll();
  }

  // Materials
  getMaterials(): Observable<PaginatedResponse<PrintingMaterial[]>> {
    return this.materialsService.getAll();
  }

  // Statistics
  getModelStats(modelId: string): Observable<ApiResponse<{
    downloads: number;
    views: number;
    rating: number;
    reviews: number;
  }>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/models/${modelId}/stats`);
  }
}
