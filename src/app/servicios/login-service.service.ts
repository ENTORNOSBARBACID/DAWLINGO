import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    return this.http.get(environment.apiUrl + '/Login').pipe(shareReplay());
  }
}
