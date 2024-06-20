import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { routesTitles } from 'src/app/misc/titles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  title: string = '';

  constructor(private location: Location, private router: Router) {}
  
  ngOnInit() {

    // Suscribirse al evento de cambio de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url; // Obtener la URL actual
        
        this.title = routesTitles[currentUrl] || 'Título Predeterminado';

        console.log('Estás en la página:', currentUrl);
      }
    });
  }


  goBack() {
    this.location.back();
  }

}
