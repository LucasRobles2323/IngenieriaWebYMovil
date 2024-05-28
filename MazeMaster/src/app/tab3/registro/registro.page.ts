import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{
  items: string[] = [];
  registroForm!: FormGroup;
  regiones: { value: string, label: string }[] = [
    { value: '15', label: 'Región de Arica y Parinacota' },
    { value: '1', label: 'Región de Tarapacá' },
    { value: '2', label: 'Región de Antofagasta' },
    { value: '3', label: 'Región de Atacama' },
    { value: '4', label: 'Región de Coquimbo' },
    { value: '5', label: 'Región de Valparaíso' },
    { value: '13', label: 'Región Metropolitana de Santiago' },
    { value: '6', label: 'Región del Libertador General Bernardo O\'Higgins' },
    { value: '7', label: 'Región del Maule' },
    { value: '16', label: 'Región de Ñuble' },
    { value: '8', label: 'Región del Biobío' },
    { value: '9', label: 'Región de La Araucanía' },
    { value: '14', label: 'Región de Los Ríos' },
    { value: '10', label: 'Región de Los Lagos' },
    { value: '11', label: 'Región de Aysén del General Carlos Ibáñez del Campo' },
    { value: '12', label: 'Región de Magallanes y de la Antártica Chilena' }
  ];

  constructor(private router: Router, private route: ActivatedRoute, 
              private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.registroForm = this.formBuilder.group({
      username: ['', Validators.required],
      rut: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.generateItems();
  }

  isEmailInvalid() {
    const emailControl = this.registroForm.get('email');
    return emailControl?.invalid && (emailControl?.dirty || emailControl?.touched);
  }

  isPasswordInvalid() {
    const passwordControl = this.registroForm.get('password');
    return passwordControl?.invalid && (passwordControl?.dirty || passwordControl?.touched);
  }

  isEmailRequiredError() {
    return this.registroForm.get('email')?.hasError('required');
  }

  isEmailFormatError() {
    return this.registroForm.get('email')?.hasError('email');
  }

  isPasswordRequiredError() {
    return this.registroForm.get('password')?.hasError('required');
  }

  isPasswordMinLengthError() {
    return this.registroForm.get('password')?.hasError('minlength');
  }

  registrarUsuario() {
    // Verificar si el formulario es válido
    if (this.registroForm.valid) {
      // Obtener los datos del formulario
      const formData = this.registroForm.value;

      // Obtener la lista de usuarios del servicio
      this.usuarioService.getUsuarios().subscribe(usuarios => {
      // Verificar si el email ya existe en la lista de usuarios
      const emailExists = usuarios.some(user => user.email === formData.email);

      if (emailExists) {
        alert('El email ya está registrado.');
      } else {
        // Llamar al servicio para agregar el nuevo usuario al JSON
        this.usuarioService.agregarUsuario(this.registroForm);
        alert('No se guardo el json, porque solo se trabajo con front-end')
        // Navegar a otra pantalla después del registro
        this.router.navigate(['../'], { relativeTo: this.route });
      }});
    } else {
      alert('El formulario no es válido. Por favor, verifique todos los campos.');
    }
  }

  private generateItems() { 
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  noImplementado() {
    alert('Aun no está implementado.');
  }
}