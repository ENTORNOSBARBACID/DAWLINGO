import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../servicio/servicio.service'; // Replace with the actual path

@Component({
  selector: 'app-lecciones',
  standalone: false,
  templateUrl: './lecciones.component.html',
  styleUrl: './lecciones.component.css',
})
export class LeccionesComponent implements OnInit {
  lecciones: any[] = [];

  constructor(private leccionesService: ServicioService) {}

  ngOnInit(): void {
    this.leccionesService.getAllLecciones().subscribe({
      next: (data: any) => {
        console.log('Lecciones recibidas:', data);
      },
      error: (err: { status: number }) => {
        console.error('Error al obtener lecciones:', err);
        if (err.status === 0) {
          console.error('Error de conexión o CORS');
        }
      },
    });
  }
}
