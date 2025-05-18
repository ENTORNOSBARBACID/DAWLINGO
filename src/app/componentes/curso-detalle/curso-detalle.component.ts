import { Component } from '@angular/core';
import { ICursos } from '../../interfaces/cursos';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-curso-detalle',
  standalone: false,
  templateUrl: './curso-detalle.component.html',
  styleUrl: './curso-detalle.component.css'
})
export class CursoDetalleComponent {
  cursos: ICursos[]=[]
  id: number=0;
  constructor(private data: ServicioService, private router: ActivatedRoute){
    this.data.getCursos().subscribe((a) =>{
      a.forEach(e => {
        this.cursos.push(e)
      });
    })
    
  }
  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id') || '';
      this.id= idParam ? Number(idParam):0
    });
  }
}
