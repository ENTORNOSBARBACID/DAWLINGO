import { Component } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { IPreguntas } from '../../interfaces/preguntas';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { LoginService } from '../../servicio/login.service';
import { IProgreso } from '../../interfaces/progresoUsuario';
@Component({
  selector: 'app-preguntas',
  standalone: false,
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css',
})
export class PreguntasComponent {
  idUsu:number=0;
  id: number = 0;
  preguntas: IPreguntas[] = [];
  nombreUsuario: string = '';
  respuestaUsuario: string = '';
  preguntaActual: IPreguntas | null = null;
  indice: number = 0;
  leccionId: number | undefined;
  tipo: string | undefined;
  enunciado: string | undefined; // <- Asegúrate que esté aquí
  dificultad: string | undefined;
  usu?:IProgreso;

  constructor(
    private servicioService: ServicioService,
    private router: ActivatedRoute,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private login: LoginService,
    private data: ServicioService,
  ) {
    const navigation = this.route.getCurrentNavigation();
    const state = navigation?.extras.state;
    this.idUsu=this.login.retornarId();

    if (isPlatformBrowser(this.platformId)) {
      this.nombreUsuario =
        state?.['usuario'] || sessionStorage.getItem('usuario') || 'Invitado';
    } else {
      this.nombreUsuario = state?.['usuario'] || 'Invitado';
    }

    
    console.log("id: "+this.idUsu); 

    console.log('USUARIO', this.nombreUsuario);
  }

  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id') || '';
      this.id = idParam ? Number(idParam) : 0;

      this.servicioService.getPreguntas(this.id).subscribe({
        next: (data: IPreguntas[]) => {
          this.preguntas = data;
          console.log(this.preguntas);
          this.indice = 0;
          this.getUsuPro(this.preguntas[0].nivelId)
          this.setPreguntaActual();
        },
        error: (err) => {
          console.error('Error obteniendo preguntas:', err);
        },
      });
    });
  }

  getUsuPro(idCurso:number){
    this.data.getUsuarioProgreso(this.idUsu, idCurso).subscribe((a) => {
      this.usu = a;
      console.log('aaaaaaaaa', this.usu);
    });
  }

  setPreguntaActual() {
    if (this.indice < this.preguntas.length) {
      this.preguntaActual = this.preguntas[this.indice];
      this.respuestaUsuario = '';
    } else {
      const leccionDes = (this.preguntaActual?.leccionId ?? 0) + 1;
      if(this.usu)
        if(this.usu.nivel_id==this.preguntas[0].nivelId)
          if(this.usu.leccion_id<=4){
              this.data.UpdateLeccionesUsuarioCurso(this.idUsu, this.preguntas[0].nivelId).subscribe({
                  next: (res: any) => {
                    console.log("Mensaje:", res.mensaje);
                  },
                error: (err) => {
                  console.error("Error al updatear:", err);
                }
              });
          }

      // Todas respondidas, volvemos a lecciones
      this.route.navigate(['/home/lecciones/'+this.preguntaActual?.nivelId], {
        state: { usuario: this.nombreUsuario },
      });
    }
  }
  verificarRespuesta() {
    if (!this.preguntaActual) return;

    const body = {
      preguntaId: this.preguntaActual.id,
      textoRespuesta: this.respuestaUsuario, // Cambiado de 'respuesta' a 'textoRespuesta'
    };

    this.servicioService.verificarRespuesta(body).subscribe({
      next: (esCorrecta: boolean) => {
        if (esCorrecta) {
          this.indice++;
          this.setPreguntaActual();
        } else {
          alert('Respuesta incorrecta. Intenta nuevamente.');
        }
      },
      error: (err) => {
        console.error('Error al verificar la respuesta:', err);
        alert('Ocurrió un error al verificar tu respuesta.');
      },
    });
  }
}
