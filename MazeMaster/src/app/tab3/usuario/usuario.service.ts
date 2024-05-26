import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosUrl = 'assets/BD.json';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.usuariosUrl);
  }

  validarUsuario(email: string, password: string, usuarios: any[]): boolean {
    return usuarios.some(user => user.email === email && user.password === password);
  }
}
