import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { EstaticosModule } from '../estaticos/estaticos.module';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalleComponent } from './curso-detalle/curso-detalle.component';
import { InicioComponent } from './inicio/inicio.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    HomeComponent,
    CursosComponent,
    CursoDetalleComponent,
    InicioComponent,
    LeccionesComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    EstaticosModule,
    RouterModule,
    BrowserModule,
    ComponentModule,
    NgModule,
  ],
  exports: [
    HomeComponent,
    CursosComponent,
    CursoDetalleComponent,
    InicioComponent,
    LeccionesComponent,
  ],
})
export class ComponentModule {}
