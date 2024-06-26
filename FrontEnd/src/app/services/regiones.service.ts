import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { urlBackEnd } from 'src/app/misc/utlBackEnd';

@Injectable({
  providedIn: 'root'
})
export class RegionesService {
  private baseUrl = urlBackEnd.url;

  constructor(private http: HttpClient) { }

  getRegiones(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/regiones`).pipe(
      catchError(this.handleError('getRegiones', []))
    );
  }

  getRegion(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/region/${codigo}`).pipe(
      catchError(this.handleError('getRegion', {}))
    );
  }

  getComunas(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${codigo}/comunas`).pipe(
      catchError(this.handleError('getComunas', []))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // Devuelve un observable con un resultado vacío para que la aplicación siga funcionando
      return throwError(error); // Puedes personalizar el manejo de errores según tus necesidades
    };
  }
}
