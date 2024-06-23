import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


export interface Usuario {
  comuna: string;
  email: string;
  isAdmin: number; // 1 es true y 0 es false en sql
  nombre: string;
  region: string;
  rut: string;
}

@Component({
  selector: 'app-sesion-usuario',
  templateUrl: './sesion-usuario.page.html',
  styleUrls: ['./sesion-usuario.page.scss'],
})
export class SesionUsuarioPage implements OnInit {
  currentUser: Usuario | null = null;
  

  constructor(private usuariosService: UsuariosService, private authService : AuthService,
              private router: Router, private tokenStorage: TokenStorageService) 
  { }

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.usuariosService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
      },
      (error) => {
        console.error('Error al cargar el usuario actual', error);
        // Manejar el error según sea necesario (redirigir, mostrar mensaje, etc.)
      }
    );
  }

  editUser() {
    // Lógica para editar usuario
    //this.router.navigate(['editar-usuario']);
    alert("Aun no implementado")
  }

  changePassword() {
    alert("Aun no implementado")
  }

  deleteAccount() {
    // Lógica para eliminar cuenta
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.usuariosService.deleteUser().subscribe(
        () => {
          this.tokenStorage.signOut(); // Cerrar sesión después de eliminar la cuenta
          this.router.navigate(['inicio-sesion']);
        },
        (error) => {
          console.error('Error al eliminar cuenta', error);
          // Manejar el error según sea necesario (mostrar mensaje, etc.)
        }
      );
    }
  }

  manageUsers() {
    // Lógica para gestionar usuarios (solo accesible si isAdmin es true)
    //this.router.navigate(['gestionar-usuarios']);
    alert("Aun no implementado")
  }

  logout() {
    // Lógica para cerrar sesión
    this.authService.logout().subscribe(
      () => {
        this.tokenStorage.signOut();
        this.router.navigate(['inicio-sesion']);
      },
      (error) => {
        console.error('Error al cerrar sesión', error);
        // Manejar el error según sea necesario (mostrar mensaje, etc.)
      }
    );
  }

  private redirigirInicioSesion(){
    this.router.navigate(['inicio-sesion']);
  }
}
