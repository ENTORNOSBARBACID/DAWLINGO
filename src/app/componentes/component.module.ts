import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EstaticosModule } from '../estaticos/estaticos.module';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalleComponent } from './curso-detalle/curso-detalle.component';
import { InicioComponent } from './inicio/inicio.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { FooterComponent } from '../estaticos/footer/footer.component';
import { HeaderComponent } from '../estaticos/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    CursosComponent,
    CursoDetalleComponent,
    InicioComponent,
    LeccionesComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterLink, RouterOutlet, EstaticosModule],
  exports: [
    HomeComponent,
    CursosComponent,
    CursoDetalleComponent,
    InicioComponent,
    LeccionesComponent,
    FooterComponent,
    HeaderComponent,
  ],
})
export class ComponentModule {}
