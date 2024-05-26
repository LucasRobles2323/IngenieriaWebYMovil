import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './usuario/usuario.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) 
  {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  isEmailInvalid() {
    const emailControl = this.loginForm.get('email');
    return emailControl?.invalid && (emailControl?.dirty || emailControl?.touched);
  }

  isPasswordInvalid() {
    const passwordControl = this.loginForm.get('password');
    return passwordControl?.invalid && (passwordControl?.dirty || passwordControl?.touched);
  }

  isEmailRequiredError() {
    return this.loginForm.get('email')?.hasError('required');
  }

  isEmailFormatError() {
    return this.loginForm.get('email')?.hasError('email');
  }

  isPasswordRequiredError() {
    return this.loginForm.get('password')?.hasError('required');
  }

  isPasswordMinLengthError() {
    return this.loginForm.get('password')?.hasError('minlength');
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.usuarioService.getUsuarios().subscribe(usuarios => {
      const usuarioValido = this.usuarioService.validarUsuario(email, password, usuarios);

      if (usuarioValido) {
        // Guardar información de sesión en el almacenamiento local
        localStorage.setItem('session', JSON.stringify({ loggedIn: true }));
        // Actualizar estado de isLoggedIn
        this.isLoggedIn = true;

        this.router.navigate(['usuario'], {queryParams: { email, password }, relativeTo: this.route });
      } else {
        alert('Email o contraseña incorrectos');
      }})
    }
    else {
      alert('Por favor, complete los campos correctamente');
    }
  }

  goToRegister() {
    this.router.navigate(['registro'], {relativeTo: this.route });
  }

  noImplementado(){
    alert('Aun no esta implementado.');
  }
}