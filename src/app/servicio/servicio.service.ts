import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICursos } from '../interfaces/cursos';
import { environment } from '../enviroments/enviroments';
import { shareReplay } from 'rxjs';
import { IPreguntas } from '../interfaces/preguntas';
import { ILecciones } from '../interfaces/lecciones';
import { IProgreso } from '../interfaces/progresoUsuario';
import { IFundamentos } from '../interfaces/fundamentos';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private http: HttpClient) {}

  public getCursos(): Observable<ICursos[]> {
    return this.http.get<ICursos[]>('sources/cursos.json');
  }

  public getFundamentos(): Observable<IFundamentos[]> {
    return this.http.get<IFundamentos[]>('sources/fundamentos_py.json');
  }

  getAllLecciones(nivel: any): Observable<ILecciones[]> {
    return this.http
      .get<ILecciones[]>(environment.apiUrl + '/Lecciones/GetAll', {
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

  addUsuarioCurso(idUsu: number, idCurso: number) {
    const body = {
      usuario_id: idUsu,
      curso_id: idCurso,
    };
    console.log(body);
    return this.http.post(
      environment.apiUrl + '/UsuarioProgreso/addUsuarioProgreso',
      body
    );
  }

  getUsuarioProgreso(idUsu: number, idCurso: number): Observable<IProgreso> {
    const body = {
      usuario_id: idUsu,
      curso_id: idCurso,
    };
    console.log(body);
    return this.http.post<IProgreso>(
      environment.apiUrl + '/UsuarioProgreso/getUsuarioProgreso',
      body
    );
  }
}
