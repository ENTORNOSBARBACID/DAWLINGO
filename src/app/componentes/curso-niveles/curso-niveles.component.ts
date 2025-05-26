import { Component } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso-niveles',
  standalone: false,
  templateUrl: './curso-niveles.component.html',
  styleUrl: './curso-niveles.component.css',
})
export class CursoNivelesComponent {
  cursoNombre: string = '';

  constructor(
    private leccionesService: ServicioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.cursoNombre = params.get('nombre') || '';
      console.log('Curso recibido:', this.cursoNombre);
    });
    this.leccionesService.getNivel(this.cursoNombre).subscribe({
      next: (data: any) => {
        console.log('recibido', data);
      },
    });
  }
}
