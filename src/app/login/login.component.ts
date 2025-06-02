import { Component } from '@angular/core';
import { EstaticosModule } from '../estaticos/estaticos.module';
import { Router, RouterLink } from '@angular/router';
import { ComponentModule } from '../componentes/component.module';
import { LoginService } from '../servicio/login.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-login',
  imports: [EstaticosModule, ComponentModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';

  constructor(private login: LoginService, private router: Router) {}

  guardarDatos() {
    this.login.login(this.usuario, this.password).subscribe({
      next: (data: any) => {
        console.log('DATOS', data);
        if (data.type === "Admin") {
          sessionStorage.setItem('usuario', data.nombre);
          this.guardarId(data.id);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
    });
    
  }
  guardarId(data:number){
  this.login.guardarId(data);
  this.router.navigate(['/home']);
  }
}
