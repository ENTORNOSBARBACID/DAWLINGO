import { Component } from '@angular/core';
import { EstaticosModule } from '../estaticos/estaticos.module';
import { Router, RouterLink } from '@angular/router';
import { ComponentModule } from '../componentes/component.module';
import { LoginService } from '../servicio/login.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [EstaticosModule, ComponentModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  loginError: boolean = false; // <- NUEVO

  constructor(private login: LoginService, private router: Router) {}

  guardarDatos() {
    this.login.login(this.usuario, this.password).subscribe({
      next: (data: any) => {
        console.log('DATOS', data);
        if (data.type === 'Admin') {
          sessionStorage.setItem('usuario', data.nombre);
          this.guardarId(data.id);
          this.guardarRol(data.type);
          this.loginError = false; // Resetea en caso de éxito
        } else {
          this.loginError = true;
        }
      },
      error: (err) => {
        console.error('Login error', err);
        this.loginError = true;
      },
    });
  }

  guardarId(data: number) {
    this.login.guardarId(data);
  }

  guardarRol(data: string) {
    console.log(data)
    this.login.guardarRol(data);
    this.router.navigate(['/home']);
  }
}
