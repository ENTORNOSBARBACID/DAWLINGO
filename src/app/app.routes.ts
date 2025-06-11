import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { CursoDetalleComponent } from './componentes/curso-detalle/curso-detalle.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LeccionesComponent } from './componentes/lecciones/lecciones.component';
import { MiCuentaComponent } from './componentes/mi-cuenta/mi-cuenta.component';
import { CursoNivelesComponent } from './componentes/curso-niveles/curso-niveles.component';
import { PreguntasComponent } from './componentes/preguntas/preguntas.component';
import { InfoLeccionesComponent } from './componentes/info-lecciones/info-lecciones.component';
import { MisCursosComponent } from './componentes/mis-cursos/mis-cursos.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { InfoAdminComponent } from './componentes/info-admin/info-admin.component';
import { SobreNosotrosComponent } from './componentes/sobre-nosotros/sobre-nosotros.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrate', component: RegistrateComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'tablas-info', component: InfoAdminComponent },
      { path: 'cursos', component: CursosComponent },
      { path: 'mis-cursos', component: MisCursosComponent },
      { path: 'cursos/detalles/:id', component: CursoDetalleComponent },
      { path: 'lecciones/:id', component: LeccionesComponent },
      { path: 'mi-cuenta', component: MiCuentaComponent },
      { path: 'sobre-nosotros', component: SobreNosotrosComponent },
      { path: 'curso-niveles/:id', component: CursoNivelesComponent },
      { path: 'lecciones/:id', component: PreguntasComponent },
      {
        path: 'info-lecciones/:id/:nivel_id/:nombre',
        component: InfoLeccionesComponent,
      },
      {
        path: 'preguntas/:leccion_id/:nivel_id',
        component: PreguntasComponent,
      },
    ],
  },
];
