import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-laberinto-end',
  templateUrl: './laberinto-end.page.html',
  styleUrls: ['./laberinto-end.page.scss'],
})
export class LaberintoEndPage implements OnInit {

  constructor( private router: Router,  private route: ActivatedRoute) { }

  returnLoading() {
    this.router.navigate(['../'], { relativeTo: this.route });
    console.log('Returned dimissed');
  }
  ngOnInit() {
  }

}
