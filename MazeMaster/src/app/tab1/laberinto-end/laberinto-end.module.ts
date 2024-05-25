import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaberintoEndPageRoutingModule } from './laberinto-end-routing.module';

import { LaberintoEndPage } from './laberinto-end.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaberintoEndPageRoutingModule
  ],
  declarations: [LaberintoEndPage]
})
export class LaberintoEndPageModule {}
