import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormError, mensajesErr } from 'src/app/misc/form-errors';
import { passwordMatchValidator, rutValidator } from 'src/app/misc/form-validators';
import { RegionesService } from 'src/app/services/regiones.service';

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

  constructor(private fb: FormBuilder, private regionService: RegionesService,
              private router: Router, private route: ActivatedRoute)
  {
    // Se inicializa el formulario con los campos requeridos y las validaciones
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      rut: ['', [Validators.required, rutValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
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
    const region = this.registerForm.get('region')!.value;

    // console.log('Región seleccionada:', region);

    if (region) {
      // Llamar al servicio para obtener las comunas de la región seleccionada
      this.regionService.getComunas(region.id).subscribe(
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

  onSubmit() {
    console.log(this.registerForm.value);
  }

  // Método para dirigirse a la pagina inicio sesión.
  goToLogin() {
    this.router.navigate(['../'], {relativeTo: this.route });
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
