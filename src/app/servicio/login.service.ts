import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Observable, shareReplay } from 'rxjs';
import { IUsuario } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private id:number=0;
  private rol:string="";
  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    const body = {
      Nombre: usuario,
      Password: password,
    };
    console.log(environment.apiUrl)
    return this.http
      .post(environment.apiUrl + '/api/Login/Login', body)
      .pipe(shareReplay());
  }

  info(usuario: string) {
    const body = {
      Nombre: usuario
    };
    console.log(body)
    return this.http
      .post(environment.apiUrl + '/Login/Info', body)
      .pipe(shareReplay());
  }
  register(nombre: string, contrasena:string, email:string, rol:number){
    const body = {
      Nombre:nombre,
      Contrasena: contrasena,
      Email:email,
      Rol:rol
    };
    console.log(body);
    return this.http.post(
      environment.apiUrl + '/Login/Register',
      body
    ).pipe(shareReplay());

  }

   edit(nombre: string, contrasena:string, email:string){
    const body = {
      Nombre:nombre,
      Password: contrasena,
      Email:email,
    };
    console.log(body);
    return this.http.post(
      environment.apiUrl + '/Login/Edit',
      body
    ).pipe(shareReplay());

  }
  getAllUsuarios(): Observable<IUsuario[]> {
    return this.http
      .get<IUsuario[]>(environment.apiUrl + '/Login/GetAll');
  }

  sumarPuntos(id:number){
    const body = {
      id:id,
    };
    console.log(body);
    return this.http.post(
      environment.apiUrl + '/Login/sumarPuntos',
      body
    ).pipe(shareReplay());
  }
    sumarPuntosLeccion(id:number){
    const body = {
      id:id,
    };
    console.log(body);
    return this.http.post(
      environment.apiUrl + '/Login/sumarPuntosLeccion',
      body
    ).pipe(shareReplay());
  }
     sumarPuntosNivel(id:number){
    const body = {
      id:id,
    };
    console.log(body);
    return this.http.post(
      environment.apiUrl + '/Login/sumarPuntosNivel',
      body
    ).pipe(shareReplay());
  }

    restarPuntos(id:number){
    const body = {
      id:id,
    };
    console.log(body);
    return this.http.post(
      environment.apiUrl + '/Login/restarPuntos',
      body
    ).pipe(shareReplay());
  }

  guardarId(id:number){
  this.id = id;
  if (typeof window !== 'undefined') {
    localStorage.setItem('idUsuario', id.toString());
  }
  console.log('id ' + this.id);
  }


  retornarId(){
  if (typeof window !== 'undefined') {
    const id = localStorage.getItem('idUsuario');
    this.id = id ? +id : 0;
  }
  return this.id;
  }

  guardarRol(rol:string){
  this.rol = rol;
  if (typeof window !== 'undefined') {
    localStorage.setItem('RolUsuario', rol);
  }
  console.log('Rol ' + this.rol);
  }

  retornarRol(){
  if (typeof window !== 'undefined') {
    const rol = localStorage.getItem('RolUsuario');
    this.rol = rol ? rol : "";
  }
  return this.rol;
  }
}
