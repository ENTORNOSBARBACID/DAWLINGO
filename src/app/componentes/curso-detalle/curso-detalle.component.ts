import { Component } from '@angular/core';
import { ICursos } from '../../interfaces/cursos';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../servicio/login.service';

@Component({
  selector: 'app-curso-detalle',
  standalone: false,
  templateUrl: './curso-detalle.component.html',
  styleUrl: './curso-detalle.component.css',
})
export class CursoDetalleComponent {
  cursos: ICursos[] = [];
  id: number = 0;
  idUsu: number = 0;
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
    this.getId();
    this.router.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id') || '';
      this.id = idParam ? Number(idParam) : 0;
    });
  }
  getId() {
    this.idUsu = this.login.retornarId();
    console.log('id: ' + this.idUsu);
  }

  inscribirse(curso: ICursos) {
    this.data.addUsuarioCurso(this.idUsu, curso.id).subscribe({
      next: (res: any) => {
        console.log('Mensaje:', res.mensaje);
        this.route.navigate(['/home/curso-niveles', curso.nombre]);
      },
      error: (err) => {
        console.error('Error al inscribirse:', err);
      },
    });
  }
}
