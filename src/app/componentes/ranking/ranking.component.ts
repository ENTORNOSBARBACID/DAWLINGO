import { Component } from '@angular/core';
import { LoginService } from '../../servicio/login.service';
import { IUsuario } from '../../interfaces/usuarios';

@Component({
  selector: 'app-ranking',
  standalone:false,
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  usu:IUsuario[]=[];
  contador:number=1;
constructor(private login: LoginService){
    this.login.getAllUsuarios().subscribe((a) => {
      a.forEach((e) => {
        this.usu.push(e);
      });
      this.usu.sort((a, b) => b.puntos - a.puntos); // orden descendente por puntos
      console.log(this.usu);
    });
}
}
