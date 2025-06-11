import { Component } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { LoginService } from '../../servicio/login.service';
import { IUsuario } from '../../interfaces/usuarios';
import { ICursos } from '../../interfaces/cursos';

@Component({
  selector: 'app-info-admin',
  standalone: false,
  templateUrl: './info-admin.component.html',
  styleUrl: './info-admin.component.css'
})
export class InfoAdminComponent {
  usu:IUsuario[]=[];
  cursos: ICursos[]=[]
constructor(private data: ServicioService, private login: LoginService){
      this.login.getAllUsuarios().subscribe((a) => {
      a.forEach((e) => {
        this.usu.push(e);
      });
      console.log(this.usu);
    });
    this.data.getCursos().subscribe((a) =>{
    a.forEach(e => {
      this.cursos.push(e);
    });
  })
}
}
