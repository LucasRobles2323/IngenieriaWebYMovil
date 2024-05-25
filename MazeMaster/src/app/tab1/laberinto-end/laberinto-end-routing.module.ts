import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaberintoEndPage } from './laberinto-end.page';

const routes: Routes = [
  {
    path: '',
    component: LaberintoEndPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaberintoEndPageRoutingModule {}
