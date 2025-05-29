import { Component } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { IPreguntas } from '../../interfaces/preguntas';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-preguntas',
  standalone: false,
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css',
})
export class PreguntasComponent {
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
  constructor(
    private servicioService: ServicioService,
    private router: ActivatedRoute,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const navigation = this.route.getCurrentNavigation();
    const state = navigation?.extras.state;

    if (isPlatformBrowser(this.platformId)) {
      this.nombreUsuario =
        state?.['usuario'] || sessionStorage.getItem('usuario') || 'Invitado';
    } else {
      this.nombreUsuario = state?.['usuario'] || 'Invitado';
    }

    console.log('USUARIO', this.nombreUsuario);
  }

  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id') || '';
      this.id = idParam ? Number(idParam) : 0;

      this.servicioService.getPreguntas(this.id).subscribe({
        next: (data: IPreguntas[]) => {
          this.preguntas = data;
          this.indice = 0;
          this.setPreguntaActual();
        },
        error: (err) => {
          console.error('Error obteniendo preguntas:', err);
        },
      });
    });
  }

  setPreguntaActual() {
    if (this.indice < this.preguntas.length) {
      this.preguntaActual = this.preguntas[this.indice];
      this.respuestaUsuario = '';
    } else {
      // Todas respondidas, volvemos a lecciones
      this.route.navigate(['/home/lecciones'], {
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
