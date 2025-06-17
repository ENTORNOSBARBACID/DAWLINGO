import { Component } from '@angular/core';
import { LoginService } from '../../servicio/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrate',
  standalone: false,
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.css',
})
export class RegistrateComponent {
  nombre: string = '';
  contrasena: string = '';
  email: string = '';
  rol: number = 0;
  correcto: boolean = true;
  constructor(private login: LoginService, private route: Router) {}
  Aceptar() {
    if (this.nombre == '' || this.contrasena == '' || this.email == '') {
      this.correcto = false;
    } else {
      this.login
        .register(this.nombre, this.contrasena, this.email, this.rol)
        .subscribe({
          next: (respuesta) => {
            console.log('Registro exitoso:', respuesta);
            this.correcto = true; // o lo que necesites hacer si todo salió bien
          },
          error: (error) => {
            console.error('Error en el registro:', error);
            this.correcto = false; // o mostrar mensaje al usuario
          },
        });
      this.route.navigate(['']);
    }
  }
}
