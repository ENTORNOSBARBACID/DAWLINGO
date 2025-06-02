import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../servicio/servicio.service'; // Replace with the actual path
import { Router } from '@angular/router';
@Component({
  selector: 'app-lecciones',
  standalone: false,
  templateUrl: './lecciones.component.html',
  styleUrl: './lecciones.component.css',
})
export class LeccionesComponent {
  lecciones: any[] = [];
  nombreUsuario: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { lecciones: any[] };

    if (state?.lecciones) {
      this.lecciones = state.lecciones;
    } else {
      // Manejar caso sin datos (ej. recargar desde backend)
    }
  }

  seleccionarLeccion(leccion: any) {
    console.log('Lección seleccionada:', leccion);
    this.router.navigate(['home/info-lecciones', leccion.id]);
  }
}
