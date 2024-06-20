import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-resolver-laberinto',
  templateUrl: './resolver-laberinto.page.html',
  styleUrls: ['./resolver-laberinto.page.scss'],
})
export class ResolverLaberintoPage implements OnInit {

  constructor(private loadingController: LoadingController, private router: Router,  private route: ActivatedRoute) {} // Inyecta LoadingController

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Encontrando Ruta...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigate(['laberinto-resuelto'], { relativeTo: this.route });
  }

}
