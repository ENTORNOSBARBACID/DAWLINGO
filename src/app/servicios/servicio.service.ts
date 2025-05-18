import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICursos } from '../interfaces/cursos';
import { environment } from '../../environments/environments';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private http: HttpClient) {}
  public getCursos(): Observable<ICursos[]> {
    return this.http.get<ICursos[]>('sources/cursos.json');
  }

  getAllLecciones() {
    return this.http
      .get(environment.apiUrl + '/Lecciones/GetAll')
      .pipe(shareReplay());
  }
}
