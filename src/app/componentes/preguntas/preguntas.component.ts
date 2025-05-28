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
  styleUrl: './preguntas.component.css'
})
export class PreguntasComponent {
  id: number = 0;
  preguntas: IPreguntas[] = [];
  nombreUsuario: string = '';

  constructor(
    private data: ServicioService,
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
    });

    this.data.getPreguntas(this.id).subscribe({
      next: (data: any) => {
        this.preguntas = data.type;
        console.log('preguntas:', this.preguntas);
      }
    });
  }
}
