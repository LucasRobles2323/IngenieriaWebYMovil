import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular'; // Importa LoadingController
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private loadingController: LoadingController, private router: Router,  private route: ActivatedRoute) {} // Inyecta LoadingController

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Encontrando Ruta...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigate(['laberinto-end'], { relativeTo: this.route });
    console.log('Loading dismissed!');
  }

}