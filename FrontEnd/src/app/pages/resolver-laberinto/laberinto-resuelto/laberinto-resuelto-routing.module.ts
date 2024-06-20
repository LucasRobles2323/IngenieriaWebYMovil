import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaberintoResueltoPage } from './laberinto-resuelto.page';

const routes: Routes = [
  {
    path: '',
    component: LaberintoResueltoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaberintoResueltoPageRoutingModule {}
