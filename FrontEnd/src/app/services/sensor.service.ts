import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { config } from 'src/environments/config';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private apiUrl = config.url;

  constructor(private http: HttpClient) { }

  getSensor(CadenaSensor: string): Observable<any>{
    // Realizar una solicitud HTTP al servidor Flask para obtener los datos del sensor
    return this.http.post<any>(`${this.apiUrl}/process`, { Cadena:CadenaSensor });
  }
}
