import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { CursoDetalleComponent } from './componentes/curso-detalle/curso-detalle.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {
        path: 'home',
        component: HomeComponent,
        children: [
          { path: '', component: InicioComponent },
          { path: 'cursos', component: CursosComponent },
          { path: 'cursos/detalles/:id',component:CursoDetalleComponent},
          // más rutas hijas si las necesitas
        ]
      },  
];
