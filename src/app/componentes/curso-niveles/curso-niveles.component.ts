import { Component } from '@angular/core';
import { ServicioService } from '../../servicio/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProgreso } from '../../interfaces/progresoUsuario';
import { LoginService } from '../../servicio/login.service';
import { INiveles } from '../../interfaces/niveles';

@Component({
  selector: 'app-curso-niveles',
  standalone: false,
  templateUrl: './curso-niveles.component.html',
  styleUrl: './curso-niveles.component.css',
})
export class CursoNivelesComponent {
  parametro: number = 0;
  niveles: INiveles[] = [];
  nombreUsuario: string = '';
  usu?:IProgreso;
  idUsu: number=0;
  constructor(
    private leccionesService: ServicioService,
    private route: ActivatedRoute,
    private router: Router,
    private data: ServicioService,
    private login: LoginService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    this.nombreUsuario =
      state?.['usuario'] || sessionStorage.getItem('usuario') || 'Invitado';
    
    this.idUsu= this.login.retornarId();
    console.log('idUsu: '+this.idUsu)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.parametro = parseInt(params.get('id') || '0', 10);
      console.log('Curso recibido:', this.parametro);

      if (this.parametro) {
        this.leccionesService.getNivel(this.parametro).subscribe({
          next: (data: any) => {
            this.niveles = data;
            this.getUsuPro(this.niveles[0].cursoId)
            console.log('recibido',this.niveles );
          },
          error: (error) => {
            console.error('Error al obtener niveles:', error);
          },
        });
      } 
  });
}
  getUsuPro(IdCurso:number){
    console.log("idCurso: "+IdCurso);
      this.data.getUsuarioProgreso(this.idUsu, IdCurso).subscribe((a) =>{
        this.usu=a
        console.log(this.usu);
      });
  }

  seleccionarNivel(nivel: any): void {
  this.router.navigate(['/home/lecciones/'+nivel.id]);
  }
}
