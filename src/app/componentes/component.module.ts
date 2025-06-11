import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EstaticosModule } from '../estaticos/estaticos.module';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalleComponent } from './curso-detalle/curso-detalle.component';
import { InicioComponent } from './inicio/inicio.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { CursoNivelesComponent } from './curso-niveles/curso-niveles.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { FormsModule } from '@angular/forms';
import { InfoLeccionesComponent } from './info-lecciones/info-lecciones.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { InfoAdminComponent } from './info-admin/info-admin.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    HomeComponent,
    CursosComponent,
    CursoDetalleComponent,
    InicioComponent,
    LeccionesComponent,
    MiCuentaComponent,
    CursoNivelesComponent,
    PreguntasComponent,
    InfoLeccionesComponent,
    MisCursosComponent,
    RegistrateComponent,
    InfoAdminComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    EstaticosModule,
    FormsModule,
  ],
  exports: [
    HomeComponent,
    CursosComponent,
    CursoDetalleComponent,
    InicioComponent,
    LeccionesComponent,
    MiCuentaComponent,
    CursoNivelesComponent,
    PreguntasComponent,
    InfoLeccionesComponent,
    MisCursosComponent,
    RegistrateComponent,
    InfoAdminComponent,
    RankingComponent
  ],
})
export class ComponentModule {}