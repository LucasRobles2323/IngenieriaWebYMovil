  import { Component, OnInit } from '@angular/core';
  import { Router, ActivatedRoute } from '@angular/router';
  import { UsuarioService } from './usuario.service';
  import { Usuario } from './usuario.model';

  @Component({
    selector: 'app-usuario',
    templateUrl: './usuario.page.html',
    styleUrls: ['./usuario.page.scss'],
  })
  export class UsuarioPage implements OnInit {
    email: string = '';
    password: string = '';
    usuario!: Usuario;

    constructor(private router: Router,
      private usuarioService: UsuarioService,
      private route: ActivatedRoute) { }

    returnPadre(){
      this.router.navigate(['../'], { relativeTo: this.route });
    }

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        const email = params['email'];
        const password = params['password'];
        if (email && password) {
          // Llamar al servicio para obtener el usuario por email y contraseña
          this.usuarioService.getUsuarioByEmailAndPassword(email, password).subscribe(usuario => {
            this.usuario = usuario;
            console.log('Usuario:', this.usuario);
          });
        }
      });
    }

  }