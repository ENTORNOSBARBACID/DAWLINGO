import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICursos } from '../interfaces/cursos';
import { environment } from '../enviroments/enviroments';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private http: HttpClient) {}

  public getCursos(): Observable<ICursos[]> {
    return this.http.get<ICursos[]>('sources/cursos.json');
  }

  getAllLecciones(nivel: any) {
    return this.http
      .get(environment.apiUrl + '/Lecciones/GetAll', {
        params: { id: nivel.toString() },
      })
      .pipe(shareReplay());
  }

  getNivel(nombreCurso: string) {
    return this.http
      .get(environment.apiUrl + '/Niveles/Niveles', {
        params: { nombreCurso },
      })
      .pipe(shareReplay());
  }

    getPreguntas(id: number) {
    return this.http
      .get(environment.apiUrl + '/Preguntas/GetAll', {
        params: { id },
      })
      .pipe(shareReplay());
  }
}
