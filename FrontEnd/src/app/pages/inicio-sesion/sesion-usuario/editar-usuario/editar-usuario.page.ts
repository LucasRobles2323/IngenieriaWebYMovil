import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormError, mensajesErr } from 'src/app/misc/form-errors';
import { rutValidator } from 'src/app/misc/form-validators';
import { RegionesService } from 'src/app/services/regiones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

interface Region {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  editForm: FormGroup;
  currentUser: any; // Objeto que contiene los datos del usuario actual

  regiones: Region[] = [];
  comunas: string[] = [];

  constructor(private fb: FormBuilder, private regionService: RegionesService, private usuariosService: UsuariosService,
              private router: Router) {
    // Inicializar el formulario con los campos y validaciones necesarias
    this.editForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      rut: ['', [Validators.required, rutValidator]],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      comuna: [{value: '', disabled: true}, Validators.required],
    });
  }

  ngOnInit() {

    this.loadCurrentUser(); // Cargar datos del usuario actual al inicializar el componente

    // Obtener las regiones disponibles
    this.regionService.getRegiones().subscribe(
      data => {
        this.regiones = data.regiones.map((region: any) => ({
          id: region.codigo,
          nombre: region.nombre,
        }));
      },
      error => {
        console.error('Error al obtener regiones:', error);
      }
    );
  }

  // Método que se ejecuta al cambiar la región
  onRegionChange() {
    const regionName = this.editForm.get('region')!.value;

    if (regionName) {
      // Encontrar la región seleccionada por nombre
      const selectedRegion = this.regiones.find(region => region.nombre === regionName);

      if (selectedRegion) {
        // Llamar al servicio para obtener las comunas de la región seleccionada
        this.obtenerComunasPorRegion(selectedRegion.id);
      }
    }
  }

  // Método para actualizar los datos del usuario
  updateUser() {
    if (this.editForm.valid) {
      console.log('Formulario válido. Actualizando usuario...');

      // Actualizar solo los campos modificados
      const updatedUserData = {
        nombre: this.editForm.get('nombre')!.value,
        rut: this.editForm.get('rut')!.value,
        region: this.editForm.get('region')!.value,
        comuna: this.editForm.get('comuna')!.value,
        isAdmin: false,
      };

      // Agregar isAdmin si está presente en currentUser
      if (this.currentUser.isAdmin) {
        updatedUserData['isAdmin'] = this.currentUser.isAdmin;
      }

      // Aquí se actualizan los datos del usuario en la base de datos
      this.usuariosService.updateUser(updatedUserData).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          // Redirigir a la página de perfil o dashboard
          this.redirigirUsuario();
        },
        error => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      console.log('Formulario inválido. No se puede actualizar usuario.');
    }
  }

  goToUser(){
    this.redirigirUsuario();
  }

  /**
   * Función que retorna el mensaje de error asociado a un campo del formulario
   * @param campo Campo del formulario (controlado)
   * @returns Mensaje de error asociado al campo, si es que existe
   */
  formError(campo: string): string | null {
    if (this.editForm.get(campo)!.errors) {
      const error: FormError = Object.keys(this.editForm.get(campo)!.errors!)[0] as FormError;
      return mensajesErr[error];
    }
    return null;
  }

  private obtenerComunasPorRegion(regionId: string) {

    this.regionService.getComunas(regionId).subscribe(
      data => {
        this.comunas = data.comunas || [];
        if (this.comunas.length > 0) {
          this.editForm.get('comuna')!.enable();
        } else {
          this.editForm.get('comuna')!.disable();
        }
      },
      error => {
        console.error('Error al obtener comunas:', error);
        // Manejo de errores si es necesario
      }
    );
  }

  // Método para cargar los datos del usuario actual en el formulario
  private cargarDatosUsuario() {
    if (this.currentUser) {
      this.editForm.patchValue({
        nombre: this.currentUser.nombre,
        rut: this.currentUser.rut,
        email: this.currentUser.email,
        region: this.currentUser.region,
        comuna: this.currentUser.comuna,
      });

      // Habilitar la selección de comuna si ya tiene una región seleccionada
      if (this.currentUser.region) {
        console.log('Región seleccionada:', this.currentUser.region);
        this.editForm.get('comuna')!.enable();

        // Encontrar la región seleccionada por nombre
        const selectedRegion = this.regiones.find(region => region.nombre === this.currentUser.region);

        if(selectedRegion){
          // Llamar al servicio para obtener las comunas de la región seleccionada (si es necesario)
          console.log('Obteniendo comunas para la región seleccionada:', selectedRegion);
          this.obtenerComunasPorRegion(selectedRegion.id);
        }
      }
    }
  }

  // Método para obtener los datos del usuario actual
  private loadCurrentUser() {

    this.usuariosService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        // Cargar los datos del usuario en el formulario
        this.cargarDatosUsuario();
      },
      (error) => {
        console.error('Error al cargar el usuario actual', error);
        alert("Error al cargar el usuario actual, sesión expirada.");
        this.redirigirInicioSesion();
      }
    );
  }

  // Método para dirigirse a la página de inicio de sesión
  private redirigirInicioSesion() {
    this.router.navigate(['inicio-sesion']);
  }

  // Método para dirigirse a la página de inicio de sesión
  private redirigirUsuario() {
    this.router.navigate(['inicio-sesion/sesion-usuario']);
  }

}
