import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
}
