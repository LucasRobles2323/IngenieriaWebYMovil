import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaberintoResueltoPageRoutingModule } from './laberinto-resuelto-routing.module';

import { LaberintoResueltoPage } from './laberinto-resuelto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaberintoResueltoPageRoutingModule
  ],
  declarations: [LaberintoResueltoPage]
})
export class LaberintoResueltoPageModule {}
