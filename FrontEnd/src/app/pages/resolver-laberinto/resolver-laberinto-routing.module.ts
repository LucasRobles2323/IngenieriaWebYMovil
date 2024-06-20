import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResolverLaberintoPage } from './resolver-laberinto.page';

const routes: Routes = [
  {
    path: '',
    component: ResolverLaberintoPage
  },  {
    path: 'laberinto-resuelto',
    loadChildren: () => import('./laberinto-resuelto/laberinto-resuelto.module').then( m => m.LaberintoResueltoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResolverLaberintoPageRoutingModule {}
