import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService, HttpRequestOptions } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AngularHttpService implements HttpService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, options: HttpRequestOptions = {}): Observable<T> {
    const httpOptions = this.createHttpOptions(options);
    return this.http.get<T>(url, httpOptions);
  }

  post<T, U = unknown>(url: string, body: U, options: HttpRequestOptions = {}): Observable<T> {
    const httpOptions = this.createHttpOptions(options);
    return this.http.post<T>(url, body, httpOptions);
  }

  put<T, U = unknown>(url: string, body: U, options: HttpRequestOptions = {}): Observable<T> {
    const httpOptions = this.createHttpOptions(options);
    return this.http.put<T>(url, body, httpOptions);
  }
  
  private createHttpOptions(options: HttpRequestOptions): { headers?: HttpHeaders, params?: HttpParams } {
    const httpOptions: { headers?: HttpHeaders, params?: HttpParams } = {};
    
    if (options.headers) {
      httpOptions.headers = new HttpHeaders(options.headers);
    }
    
    if (options.params) {
      let params = new HttpParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
      httpOptions.params = params;
    }
    
    return httpOptions;
  }

  delete<T>(url: string, options: HttpRequestOptions = {}): Observable<T> {
    const httpOptions = this.createHttpOptions(options);
    return this.http.delete<T>(url, httpOptions);
  }
}
