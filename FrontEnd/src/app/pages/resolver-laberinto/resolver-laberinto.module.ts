import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResolverLaberintoPageRoutingModule } from './resolver-laberinto-routing.module';

import { ResolverLaberintoPage } from './resolver-laberinto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResolverLaberintoPageRoutingModule
  ],
  declarations: [ResolverLaberintoPage]
})
export class ResolverLaberintoPageModule {}
