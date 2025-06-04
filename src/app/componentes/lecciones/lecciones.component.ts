import { Component } from '@angular/core';
import { ICursos } from '../../interfaces/cursos';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { ILecciones } from '../../interfaces/lecciones';
import { LoginService } from '../../servicio/login.service';
import { IUsuario } from '../../interfaces/usuarios';
import { IProgreso } from '../../interfaces/progresoUsuario';

@Component({
  selector: 'app-lecciones',
  standalone: false,
  templateUrl: './lecciones.component.html',
  styleUrl: './lecciones.component.css',
})
export class LeccionesComponent {
  lecciones: ILecciones[] = [];
  usu?: IProgreso;
  id: number = 0;
  idUsu: number = 0;

  constructor(
    private route: Router,
    private data: ServicioService,
    private activatedRouter: ActivatedRoute,
    private login: LoginService
  ) {
    this.activatedRouter.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id') || '';
      this.id = idParam ? Number(idParam) : 0;
    });

    this.idUsu = this.login.retornarId();
  }
  ngOnInit() {
    this.data.getAllLecciones(this.id).subscribe((a) => {
      a.forEach((e) => {
        this.lecciones.push(e);
      });
    });
    this.getUsuPro()
  }
  getUsuPro(){
    this.data.getUsuarioProgreso(this.idUsu, this.id).subscribe((a) => {
      this.usu = a;
      console.log('usuario: ', this.usu);
    });
  }
  seleccionarLeccion(leccion: any) {
    console.log('Lección seleccionada:', leccion);
    const nombreLimpio = leccion.nombre
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Usa las propiedades correctas del objeto lección
    this.route.navigate([
      '/home/info-lecciones',
      leccion.id, // Cambiado de leccion.leccion_id a leccion.id
      leccion.nivelId, // Cambiado de leccion.nivel_id a leccion.nivelId
      nombreLimpio,
    ]);
  }
}
