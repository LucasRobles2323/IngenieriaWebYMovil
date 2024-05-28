import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Usuario } from './usuario.model';
import { map } from 'rxjs/operators';
import { FormGroup} from '@angular/forms';

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

  agregarUsuario(formData: FormGroup): void {
    // Obtener los valores del formulario
    const username = formData.get('username')?.value;
    const rut = formData.get('rut')?.value;
    const email = formData.get('email')?.value;
    const region = formData.get('region')?.value;
    const password = formData.get('password')?.value;

    // Obtener la lista de usuarios del servicio
    this.getUsuarios().subscribe(usuarios => {
      // Encontrar el ID más grande de los usuarios existentes
      let maxId = 0;
      usuarios.forEach(usuario => {
        const id = parseInt(usuario.idUsuario);
        if (id > maxId) {
          maxId = id;
        }
      });

      // Generar el ID único para el nuevo usuario
      const idUsuario = (maxId + 1).toString();

      // Crear un nuevo usuario con los valores del formulario
      const nuevoUsuario: Usuario = {
        idUsuario: idUsuario,
        nombre: username,
        rut: rut,
        email: email,
        region: region,
        password: password,
        isAdmin: false
      };

      console.log('Usuario');
      console.log('ID:', nuevoUsuario.idUsuario);
      console.log('Username:', nuevoUsuario.nombre);
      console.log('RUT:', nuevoUsuario.rut);
      console.log('Email:', nuevoUsuario.email);
      console.log('Region:', nuevoUsuario.region);
      console.log('Password:', nuevoUsuario.password);
      console.log('isAdmin:', nuevoUsuario.isAdmin);

      // Aqui lo enviaria al json, pero descubri que el front-end no deja modificar archivos, solo leerlos.
      //return this.http.post<any>(this.usuariosUrl, nuevoUsuario);
    });
  }
}