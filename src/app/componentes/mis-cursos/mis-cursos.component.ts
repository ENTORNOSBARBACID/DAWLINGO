import { Component } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { ICursos } from '../../interfaces/cursos';
import { LoginService } from '../../servicio/login.service';
import { IProgreso } from '../../interfaces/progresoUsuario';

@Component({
  selector: 'app-mis-cursos',
  standalone: false,
  templateUrl: './mis-cursos.component.html',
  styleUrl: './mis-cursos.component.css'
})
export class MisCursosComponent {
cursos:ICursos[]=[]
idUsu:number=0;
usu?:IProgreso[]=[];

constructor(
  private data: ServicioService,
  private login: LoginService
){
  this.idUsu=this.login.retornarId()
  this.getUsuPro(this.idUsu)
}

getCursos(){
   this.data.getCursos().subscribe((a) => {
  // Filtra solo los cursos que están en usu
    this.cursos = a.filter(curso => 
      this.usu?.some(u => u.curso_id === curso.id)
    );
      });
    console.log("cursos, ",this.cursos)
    
}
getUsuPro(IdCurso: number) {
  this.data.getUsuarioProgresoSinCurso(this.idUsu).subscribe({
    next: (a) => {
      this.usu = a;
      if(this.usu != null)
        this.getCursos();
    },
    error: (err) => {
      console.warn("No se encontraron progresos, pero continuamos.");
      this.usu = [];  // vaciamos para que getCursos filtre en vacío
      this.getCursos(); // Aún así llamamos para mostrar "No estás apuntado..."
    }
  });
}
}
