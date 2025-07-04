import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { IFundamentos } from '../../interfaces/fundamentos';
import { ActivatedRoute, Router } from '@angular/router';
import { marked } from 'marked';

@Component({
  selector: 'app-info-lecciones',
  standalone: false,
  templateUrl: './info-lecciones.component.html',
  styleUrls: ['./info-lecciones.component.css'],
})
export class InfoLeccionesComponent implements OnInit {
  fundamentos: IFundamentos[] = [];
  estructuras: IFundamentos[] = [];

  leccionSeleccionada?: IFundamentos;

  leccionIdParam: string = '';
  nivelIdParam: string = '';
  contenidoHTML: string = '';

  constructor(
    private data: ServicioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.data.getFundamentos().subscribe(async (fundamentos) => {
      this.fundamentos = fundamentos;

      this.route.paramMap.subscribe(async (params) => {
        this.leccionIdParam = params.get('id') || '';
        const nombreParam = params.get('nombre') || '';
        this.nivelIdParam = params.get('curso_id') || '';
        const id = Number(this.leccionIdParam);

        this.leccionSeleccionada = this.fundamentos.find(
          (f) => f.id === id && f.titulo === nombreParam
        );

        if (this.leccionSeleccionada) {
          this.contenidoHTML = await marked(this.leccionSeleccionada.contenido);
        } else {
          this.contenidoHTML = ''; // O muestra un mensaje de "no encontrado"
        }
      });
    });
  }

  empezarLeccion() {
    if (this.leccionSeleccionada) {
      console.log('lecciodid', this.leccionIdParam);
      this.router.navigate([
        '/home/preguntas',
        this.leccionSeleccionada.id,
        this.nivelIdParam,
      ]);
    }
  }

  formatearTitulo(titulo: string): string {
    return titulo.replace(/-/g, ' ');
  }
}
