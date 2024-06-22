import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/environments/config';

@Injectable({
  providedIn: 'root'
})
export class RegionesService {
  private baseUrl = config.url;

  constructor(private http: HttpClient) { }

  getRegiones(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/regiones`);
  }

  getRegion(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/region/${codigo}`);
  }

  getComunas(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${codigo}/comunas`);
  }
   
}
