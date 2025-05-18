import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { CursoDetalleComponent } from './componentes/curso-detalle/curso-detalle.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LeccionesComponent } from './componentes/lecciones/lecciones.component';

export const routes: Routes = [
  //{ path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'cursos', component: CursosComponent },
      { path: 'cursos/detalles/:id', component: CursoDetalleComponent },
    ],
  },
  { path: 'lecciones', component: LeccionesComponent }, // <-- aquí ahora está a nivel raíz
];
