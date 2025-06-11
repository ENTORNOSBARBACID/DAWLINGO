import { Component } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { IPreguntas } from '../../interfaces/preguntas';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { LoginService } from '../../servicio/login.service';
import { IProgreso } from '../../interfaces/progresoUsuario';
import { IRespuestas } from '../../interfaces/respuestas';
@Component({
  selector: 'app-preguntas',
  standalone: false,
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css',
})
export class PreguntasComponent {
  idUsu: number = 0;
  id: number = 0;
  preguntas: IPreguntas[] = [];
  nombreUsuario: string = '';
  respuestaUsuario: string = '';
  preguntaActual: IPreguntas | null = null;
  respuestas: IRespuestas | null = null;
  indice: number = 0;
  leccionId: number | undefined;
  cursoId: number =0;
  tipo: string | undefined;
  enunciado: string | undefined; // <- Asegúrate que esté aquí
  dificultad: string | undefined;
  usu?: IProgreso;
  preguntaRespuestasMap: { [preguntaId: number]: IRespuestas[] } = {};
  respuestaSeleccionada: IRespuestas | null = null;

  constructor(
    private servicioService: ServicioService,
    private router: ActivatedRoute,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private login: LoginService,
    private data: ServicioService
  ) {
    const navigation = this.route.getCurrentNavigation();
    const state = navigation?.extras.state;
    this.idUsu = this.login.retornarId();

    if (isPlatformBrowser(this.platformId)) {
      this.nombreUsuario =
        state?.['usuario'] || sessionStorage.getItem('usuario') || 'Invitado';
    } else {
      this.nombreUsuario = state?.['usuario'] || 'Invitado';
    }


    console.log('id: ' + this.idUsu);

    

    console.log('USUARIO', this.nombreUsuario);
  }

  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      const leccionIdParam = params.get('leccion_id') || '';
      this.id = leccionIdParam ? Number(leccionIdParam) : 0;


    this.router.paramMap.subscribe((params: ParamMap) => {
      const leccionIdParam = params.get('curso_id') || '';
      this.cursoId = leccionIdParam ? Number(leccionIdParam) : 0});

      

      this.servicioService.getPreguntas(this.id).subscribe({
        next: (data: IPreguntas[]) => {
          this.preguntas = data;
          this.indice = 0;
          this.getUsuPro();
          this.setPreguntaActual();
        },
        error: (err) => {
          console.error('Error obteniendo preguntas:', err);
        },
      });

      this.servicioService.getRespuestas().subscribe({
        next: (data: IRespuestas[]) => {
          // Agrupar respuestas por pregunta
          for (let respuesta of data) {
            const pid = respuesta.preguntaId;
            if (!this.preguntaRespuestasMap[pid]) {
              this.preguntaRespuestasMap[pid] = [];
            }
            this.preguntaRespuestasMap[pid].push(respuesta);
          }
        },
        error: (err) => {
          console.error('Error al obtener respuestas', err);
        },
      });
    });
  }

  getUsuPro() {
    console.log('nivelid: ' + this.cursoId);
    this.data.getUsuarioProgreso(this.idUsu, this.cursoId).subscribe((a) => {
      this.usu = a;
      console.log('UsuarioProgreso', this.usu);
    });
  }

  setPreguntaActual() {
    if (this.indice < this.preguntas.length) {
      this.preguntaActual = this.preguntas[this.indice];
      this.respuestaUsuario = '';
    } else {
      const leccionDes = (this.preguntaActual?.leccionId ?? 0) + 1;
      console.log('UsuarioProgreso', this.usu);
       if (this.usu){
        if (this.usu.nivel_id == this.preguntas[0].nivelId){
          console.log("hoola")
          if (this.usu.leccion_id <= 4) {
            console.log("nivel: "+this.cursoId)
            this.data
              .UpdateLeccionesUsuarioCurso(
                this.idUsu,
                this.cursoId
              )
              .subscribe({
                next: (res: any) => {
                  console.log('Mensaje:', res.mensaje);
                },
                error: (err) => {
                  console.error('Error al updatear:', err);
                },
              });
          }
        }
        }

      // Todas respondidas, volvemos a lecciones
      
      this.sumarPuntosLeccion();
      this.route.navigate(['/home/lecciones/' + this.preguntaActual?.nivelId], {
        state: { usuario: this.nombreUsuario },
      });
    }
  }

  seleccionarRespuesta(opcion: IRespuestas) {
    this.respuestaSeleccionada = opcion;
  }

  verificarRespuesta() {
    if (!this.preguntaActual || !this.respuestaSeleccionada) return;

    const body = {
      preguntaId: this.preguntaActual.id,
      textoRespuesta: this.respuestaSeleccionada.texto, // usando la opción seleccionada
    };

    this.servicioService.verificarRespuesta(body).subscribe({
      next: (esCorrecta: boolean) => {
        if (esCorrecta) {
          this.respuestaSeleccionada = null;
          this.indice++;
          this.sumarPuntos()
          this.setPreguntaActual();
        } else {
          this.restarPuntos()
          alert('Respuesta incorrecta, te han restado 10 puntos. Intenta nuevamente.');
        }
      },
      error: (err) => {
        console.error('Error al verificar la respuesta:', err);
        alert('Ocurrió un error al verificar tu respuesta.');
      },
    });
  }
  sumarPuntos(){
    this.login.sumarPuntos(this.idUsu)
      .subscribe({
        next: (respuesta) => {
          console.log('Edicion exitosa:', respuesta);
        },
        error: (error) => {
          console.error('Error al editar:', error);
        }
      });
  }
    sumarPuntosLeccion(){
    this.login.sumarPuntosLeccion(this.idUsu)
      .subscribe({
        next: (respuesta) => {
          console.log('Edicion exitosa:', respuesta);
        },
        error: (error) => {
          console.error('Error al editar:', error);
        }
      });
  }

    restarPuntos(){
    this.login.restarPuntos(this.idUsu)
      .subscribe({
        next: (respuesta) => {
          console.log('Edicion exitosa:', respuesta);
        },
        error: (error) => {
          console.error('Error al editar:', error);
        }
      });
  }
  calcularPorcentaje(): number {
    if (this.preguntas.length === 0) return 0;
    return Math.round((this.indice / this.preguntas.length) * 100);
  }
}
