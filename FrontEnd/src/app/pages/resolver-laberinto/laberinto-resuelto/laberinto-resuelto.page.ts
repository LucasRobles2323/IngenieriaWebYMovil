import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-laberinto-resuelto',
  templateUrl: './laberinto-resuelto.page.html',
  styleUrls: ['./laberinto-resuelto.page.scss'],
})
export class LaberintoResueltoPage implements OnInit {

  constructor( private router: Router,  private route: ActivatedRoute) { }

  ngOnInit() {
  }

  returnLoading() {
    this.router.navigate(['../'], { relativeTo: this.route });
    console.log('Returned dimissed');
  }
  

}
