import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-info-lecciones',
  standalone: false,

  templateUrl: './info-lecciones.component.html',
  styleUrl: './info-lecciones.component.css',
})
export class InfoLeccionesComponent implements OnInit {
  leccionId: number | null = null;
  contenidoLeccion: any = null;

  lecciones = [
    {
      id: 1,
      titulo: 'Variables y Tipos de Datos',
      contenido: '... contenido extenso para la lección 1 ...',
    },
    {
      id: 2,
      titulo: 'Operadores',
      contenido: '... contenido extenso para la lección 2 ...',
    },
    {
      id: 3,
      titulo: 'Entrada y Salida de Datos',
      contenido: '... contenido extenso para la lección 3 ...',
    },
    {
      id: 4,
      titulo: 'Comentarios y Buenas Prácticas',
      contenido: '... contenido extenso para la lección 4 ...',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.leccionId = idParam ? +idParam : null;

      if (this.leccionId) {
        this.contenidoLeccion = this.lecciones.find(
          (l) => l.id === this.leccionId
        );
      } else {
        this.contenidoLeccion = {
          titulo: 'Lección no encontrada',
          contenido: 'Selecciona una lección válida.',
        };
      }
    });
  }
}
