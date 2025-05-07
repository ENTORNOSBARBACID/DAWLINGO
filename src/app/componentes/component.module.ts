import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EstaticosModule } from '../estaticos/estaticos.module';
import { CursosComponent } from './cursos/cursos.component';



@NgModule({
  declarations: [HomeComponent, CursosComponent],
  imports: [
    CommonModule, RouterLink, RouterOutlet, EstaticosModule
  ],
  exports:[HomeComponent, CursosComponent]
})
export class ComponentModule { }
