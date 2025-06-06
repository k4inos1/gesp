import { Observable } from 'rxjs';

export interface HttpRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

export interface HttpService {
  get<T>(url: string, options?: HttpRequestOptions): Observable<T>;
  post<T, U = unknown>(url: string, body: U, options?: HttpRequestOptions): Observable<T>;
  put<T, U = unknown>(url: string, body: U, options?: HttpRequestOptions): Observable<T>;
  delete<T>(url: string, options?: HttpRequestOptions): Observable<T>;
}
