import { Component } from '@angular/core';
import { EstaticosModule } from '../estaticos/estaticos.module';
import { RouterLink } from '@angular/router';
import { ComponentModule } from '../componentes/component.module';

@Component({
  selector: 'app-login',
  imports: [EstaticosModule, RouterLink, ComponentModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  changePage(){

  }
}
