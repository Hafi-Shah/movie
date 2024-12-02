import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enivronments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // Generic GET method
  get<T>(endpoint?: string, params?: HttpParams): Observable<T> {
    //debugger;
    return this.http.get<T>(`${environment.api_url}`, { params });
  }
}
