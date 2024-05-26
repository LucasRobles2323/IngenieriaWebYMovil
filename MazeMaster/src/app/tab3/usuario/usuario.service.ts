import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';
import { map } from 'rxjs/operators';

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

  getUsuarioByEmailAndPassword(email: string, password: string): Observable<Usuario> {
    return this.http.get<any[]>(this.usuariosUrl).pipe(
      map(usuarios => usuarios.find(user => user.email === email && user.password === password))
    );
  }
}
