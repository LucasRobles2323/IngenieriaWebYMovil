import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'registro',
    loadChildren: () => import('../tab3/registro/registro.module').then( m => m.RegistroPageModule),
  },
  {
    path: 'usuario',
    loadChildren: () => import('../tab3/usuario/usuario.module').then( m => m.UsuarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {
  routes = routes; // Define la propiedad 'routes' aquí
}