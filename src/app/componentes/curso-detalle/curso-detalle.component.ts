import { Component } from '@angular/core';
import { ICursos } from '../../interfaces/cursos';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../servicio/login.service';
import { IProgreso } from '../../interfaces/progresoUsuario';

@Component({
  selector: 'app-curso-detalle',
  standalone: false,
  templateUrl: './curso-detalle.component.html',
  styleUrl: './curso-detalle.component.css',
})
export class CursoDetalleComponent {
  cursos: ICursos[] = [];
  id: number = 0;
  idUsu: number=0;
  usu?:IProgreso
  constructor(
    private data: ServicioService,
    private router: ActivatedRoute,
    private route: Router,
    private login: LoginService
  ) {
    this.data.getCursos().subscribe((a) => {
      a.forEach((e) => {
        this.cursos.push(e);
      });
    });
  }
  ngOnInit() {
    
    this.router.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id') || '';
      this.id = idParam ? Number(idParam) : 0;
      this.getId()
    });
    
  }
  getId(){
    this.idUsu=this.login.retornarId();
    this.getUsuPro(this.id)
  }

  getUsuPro(idCurso: number){
    
    this.data.getUsuarioProgreso(this.idUsu, idCurso).subscribe((a) => {
      this.usu = a;
      console.log('usuario: ', this.usu);
    });
  }

  inscribirse(curso: ICursos) {
    this.data.addUsuarioCurso(this.idUsu, curso.id).subscribe({
    next: (res: any) => {
      console.log("Mensaje:", res.mensaje);
      this.route.navigate(['/home/curso-niveles', curso.id]);
    },
  error: (err) => {
    console.error("Error al inscribirse:", err);
  }
});
  }
}
