import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicio/login.service';
import { IProgreso } from '../../interfaces/progresoUsuario';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  rol: string="";
  constructor(private login: LoginService){
    this.rol=this.login.retornarRol()
    console.log("Rol: "+this.rol) 
  }
}
