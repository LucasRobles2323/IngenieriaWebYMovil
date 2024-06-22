import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormError, mensajesErr } from 'src/app/misc/form-errors';
import { passwordMatchValidator, rutValidator } from 'src/app/misc/form-validators';
import { RegionesService } from 'src/app/services/regiones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

interface Region {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  registerForm: FormGroup;

  regiones: Region[] = [];
  comunas: string[] = [];

  constructor(private fb: FormBuilder, private regionService: RegionesService, private usuariosService: UsuariosService,
              private router: Router, private route: ActivatedRoute)
  {
    // Se inicializa el formulario con los campos requeridos y las validaciones
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      rut: ['', [Validators.required, rutValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      passwordConfirm: ['', [Validators.required, passwordMatchValidator]],
      region: ['', Validators.required],
      comuna: [{value: '', disabled: true}, Validators.required],
    });
  }

  // Se obtienen las regiones al iniciar el componente
  ngOnInit() {
    this.regionService.getRegiones().subscribe(
      data => {
        this.regiones = data.regiones.map((region: any) => ({
          id: region.codigo,
          nombre: region.nombre
        }));
      }
    );
  }

  // Método que se ejecuta al cambiar la región
  onRegionChange() {
    const regionName = this.registerForm.get('region')!.value;

    if (regionName) {
      // Encontrar la región seleccionada por nombre
      const selectedRegion = this.regiones.find(region => region.nombre === regionName);

      if (selectedRegion) {
        // Llamar al servicio para obtener las comunas de la región seleccionada
        this.regionService.getComunas(selectedRegion.id).subscribe(
          data => {
            this.comunas = data.comunas || [];
            if (this.comunas.length > 0) {
              this.registerForm.get('comuna')!.enable();
            } else {
              this.registerForm.get('comuna')!.disable();
            }
          }
        );
      }
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.usuariosService.createUser(this.registerForm.value).subscribe(
        response => {
          console.log(response);
          alert("Registrado exitosamente");
          this.router.navigate(['inicio-sesion']);
        },
      );
    }
    console.log(this.registerForm.value);
  }

  // Método para dirigirse a la pagina inicio sesión.
  goToLogin() {
    this.router.navigate(['inicio-sesion']);
  }

  /**
   * Función que retorna el mensaje de error asociado a un campo del formulario
   * @param campo Campo del formulario (controlado)
   * @returns Mensaje de error asociado al campo, si es que existe
   */
  formError(campo: string): string | null {
    if (this.registerForm.get(campo)!.errors) {
      const error: FormError = Object.keys(this.registerForm.get(campo)!.errors!)[0] as FormError;
      return mensajesErr[error];
    }
    return null;
  }

}
