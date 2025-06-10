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
        this.nivelIdParam = params.get('nivel_id') || '';

        const id = Number(this.leccionIdParam);

        this.leccionSeleccionada = this.fundamentos.find((f) => {
          const nombreLimpio = f.titulo
            .replace(/\s+/g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
          return f.id === id && nombreLimpio === nombreParam;
        });

        if (this.leccionSeleccionada) {
          this.contenidoHTML = await marked(this.leccionSeleccionada.contenido);
        }
      });
    });
  }

  empezarLeccion() {
    if (this.leccionSeleccionada) {
      this.router.navigate([
        '/home/preguntas',
        this.leccionIdParam,
        this.nivelIdParam,
      ]);
    }
  }
}
