import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    children:  [
    {
      path: 'registro',
      loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
    },
    {
      path: 'usuario',
      loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {
  routes = routes; // Define la propiedad 'routes' aquí
}