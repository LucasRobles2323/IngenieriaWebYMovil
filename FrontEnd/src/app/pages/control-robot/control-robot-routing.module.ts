import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlRobotPage } from './control-robot.page';

const routes: Routes = [
  {
    path: '',
    component: ControlRobotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlRobotPageRoutingModule {}
