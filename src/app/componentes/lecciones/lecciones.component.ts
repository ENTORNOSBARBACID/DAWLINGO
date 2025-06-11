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
  idNivel: number = 0

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
     console.log('Parametro recibido:'+this.id)
    this.data.getAllLecciones(this.id).subscribe((a) => {
      a.forEach((e) => {
        this.lecciones.push(e);
      });
      console.log(this.lecciones)
      this.getUsuPro(this.lecciones[0].curso_id)
      this.idNivel=this.lecciones[0].curso_id
    });
  }

  getUsuPro(idCurso: number){
    this.data.getUsuarioProgreso(this.idUsu, idCurso).subscribe((a) => {
      this.usu = a;
      console.log('usuario: ', this.usu);
      if(this.usu?.leccion_id>=this.lecciones.length + 1)
          this.subirNivel(this.usu.usuario_id, this.usu.curso_id)
    });
    
}
subirNivel(idUsu:number, idCurso:number){
      this.login.sumarPuntosNivel(this.idUsu)
      .subscribe({
        next: (respuesta) => {
          console.log('Edicion exitosa:', respuesta);
        },
        error: (error) => {
          console.error('Error al editar:', error);
        }
      });   


        this.data.UpdateNivelUsuarioCurso(idUsu, idCurso).subscribe({
        next: (res: any) => {
          console.log("Mensaje:", res.mensaje);
        },
      error: (err) => {
        console.error("Error al updatear:", err);
      }
    });
    alert('Has completado todas las lecciones del nivel! se han sumado... 100 puntos!');
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
      leccion.curso_id, // Cambiado de leccion.nivel_id a leccion.nivelId
      nombreLimpio,
    ]);
  }
  atras(){
    console.log("Id del nivel: "+this.idNivel)
       this.route.navigate([
      '/home/curso-niveles/'+this.idNivel
    ]);
  }
}
