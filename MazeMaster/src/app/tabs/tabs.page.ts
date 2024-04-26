import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tab1Icon: string = '../../assets/icon/laberinto.png';
  tab2Image: string = '../../assets/icon/robot.png';

  constructor() {}

  changeTab2Image() {
    this.tab2Image = '../../assets/icon/robotSelected.png';
  }
}
