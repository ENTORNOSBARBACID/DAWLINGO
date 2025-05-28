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

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'cursos', component: CursosComponent },
      { path: 'cursos/detalles/:id', component: CursoDetalleComponent },
      { path: 'lecciones', component: LeccionesComponent },
      { path: 'mi-cuenta', component: MiCuentaComponent },
      { path: 'curso-niveles/:nombre', component: CursoNivelesComponent },
      { path: 'lecciones/:id', component: PreguntasComponent },
    ],
  },
];
