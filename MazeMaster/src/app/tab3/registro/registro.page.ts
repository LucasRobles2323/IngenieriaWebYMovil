import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{

  constructor(private router: Router, private route: ActivatedRoute) { }

  goBack(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  noImplementado(){
    alert('Aun no esta implementado.');
  }
}
