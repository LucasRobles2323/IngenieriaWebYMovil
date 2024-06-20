import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlRobotPageRoutingModule } from './control-robot-routing.module';

import { ControlRobotPage } from './control-robot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlRobotPageRoutingModule
  ],
  declarations: [ControlRobotPage]
})
export class ControlRobotPageModule {}
