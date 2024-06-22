import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/environments/config';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl = config.url;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  changePassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${email}/change-password`, { new_password: newPassword });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }

  getUser(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${email}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/new-usuario`, user);
  }

  updateUser(email: string, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${email}/update`, user);
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${email}/eliminar`);
  }
}
