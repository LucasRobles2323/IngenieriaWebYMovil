import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LaberintoEndPageRoutingModule } from './laberinto-end-routing.module';
import { LaberintoEndPage } from './laberinto-end.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LaberintoEndPageRoutingModule
  ],
  declarations: [LaberintoEndPage]
})
export class LaberintoEndPageModule {}
