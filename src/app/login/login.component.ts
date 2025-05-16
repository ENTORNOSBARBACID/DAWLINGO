import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../servicios/login-service.service';
import { FooterComponent } from '../estaticos/footer/footer.component';
import { HeaderComponent } from '../estaticos/header/header.component';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';

  constructor(private login: LoginServiceService, private router: Router) {}

  guardarDatos() {
    this.login.login(this.usuario, this.password).subscribe({
      next: (data: any) => {
        if (data.type === 1) {
          this.router.navigate(['/home']);
        } else if (data.type === 0) {
          this.router.navigate(['/lecciones']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Error al intentar iniciar sesión');
      },
    });
  }
}
