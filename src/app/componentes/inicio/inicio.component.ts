import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicio/login.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  nombreUsuario: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    this.nombreUsuario =
      state?.['usuario'] || sessionStorage.getItem('usuario') || 'Invitado';
  }
}
