import { Component } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute, Router } from '@angular/router'; // 👈 añade Router

@Component({
  selector: 'app-curso-niveles',
  standalone: false,
  templateUrl: './curso-niveles.component.html',
  styleUrl: './curso-niveles.component.css',
})
export class CursoNivelesComponent {
  cursoNombre: string = '';
  niveles: any[] = [];
  nombreUsuario: string = '';

  constructor(
    private leccionesService: ServicioService,
    private route: ActivatedRoute,
    private router: Router // 👈 inyecta el Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    this.nombreUsuario =
      state?.['usuario'] || sessionStorage.getItem('usuario') || 'Invitado';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.cursoNombre = params.get('nombre') || '';
      console.log('Curso recibido:', this.cursoNombre);

      if (this.cursoNombre) {
        this.leccionesService.getNivel(this.cursoNombre).subscribe({
          next: (data: any) => {
            this.niveles = data;
            console.log('recibido', data);
          },
          error: (error) => {
            console.error('Error al obtener niveles:', error);
          },
        });
      }
    });
  }

  seleccionarNivel(nivel: any): void {
    this.leccionesService.getAllLecciones(nivel.id).subscribe({
      next: (data: any) => {
        console.log('Lecciones', data);
        this.router.navigate(['/home/lecciones'], {
          state: { lecciones: data },
        });
      },
    });
    // Aquí podrías navegar o cargar lecciones
  }
}
