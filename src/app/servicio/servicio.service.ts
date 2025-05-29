import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICursos } from '../interfaces/cursos';
import { environment } from '../enviroments/enviroments';
import { shareReplay } from 'rxjs';
import { IPreguntas } from '../interfaces/preguntas';

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

  getPreguntas(id: number): Observable<IPreguntas[]> {
    return this.http
      .get<IPreguntas[]>(environment.apiUrl + '/Preguntas/GetAll', {
        params: { id: id.toString() }, // mejor pasar como string explícito
      })
      .pipe(shareReplay());
  }

  verificarRespuesta(body: { preguntaId: number; textoRespuesta: string }) {
    return this.http.post<boolean>(
      environment.apiUrl + '/Preguntas/VerificarRespuesta',
      body
    );
  }
}
