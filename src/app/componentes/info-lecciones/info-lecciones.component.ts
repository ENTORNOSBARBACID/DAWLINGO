import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { IFundamentos } from '../../interfaces/fundamentos';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private data: ServicioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.data.getFundamentos().subscribe((fundamentos) => {
      this.fundamentos = fundamentos;

      this.route.paramMap.subscribe((params) => {
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
