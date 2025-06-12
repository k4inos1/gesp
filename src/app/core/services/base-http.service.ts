import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, FilterParams, PaginatedResponse } from '../../shared/models/base.model';
import { BASE_URL } from '../tokens/base-url.token';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<T> {  constructor(
    protected http: HttpClient,
    @Inject(BASE_URL) protected baseUrl: string
  ) {}

  getAll(params?: FilterParams): Observable<PaginatedResponse<T[]>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<T[]>>(this.baseUrl, { params: httpParams });
  }

  getById(id: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<T>): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(this.baseUrl, data);
  }

  update(id: string, data: Partial<T>): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
