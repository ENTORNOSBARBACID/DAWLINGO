import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  id:number=0;
  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    const body = {
      nombre: usuario,
      password: password,
    };
    return this.http
      .post(environment.apiUrl + '/Login/Login', body)
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
  guardarId(id:number){
    this.id=id
    sessionStorage.setItem('idUsuario', id.toString()); 
    console.log('id '+this.id); 
  }
  retornarId(){
    return this.id;
  }
  addUsuarioCurso(idUsu:number, idCurso:number){
        const body = {
      usuario_id: idUsu,
      curso_id: idCurso
    };
    this.http
      .post(environment.apiUrl + '/Login/Info', body)
      .pipe(shareReplay());
  }
}
