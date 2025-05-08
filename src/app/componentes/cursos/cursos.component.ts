import { Component } from '@angular/core';
import { ICursos } from '../../interfaces/cursos';
import { ServicioService } from '../../servicio/servicio.service';

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
cursos: ICursos[]=[]
constructor(private data: ServicioService){
  this.data.getCursos().subscribe((a) =>{
    a.forEach(e => {
      this.cursos.push(e)
    });
  })
  
}
}
