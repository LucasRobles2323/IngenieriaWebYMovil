import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaberintoResueltoPageRoutingModule } from './laberinto-resuelto-routing.module';
import { LaberintoResueltoPage } from './laberinto-resuelto.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LaberintoResueltoPageRoutingModule
  ],
  declarations: [LaberintoResueltoPage]
})
export class LaberintoResueltoPageModule {}
