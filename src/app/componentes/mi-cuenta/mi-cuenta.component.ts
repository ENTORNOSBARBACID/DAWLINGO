import { Component } from '@angular/core';
import { IUsuario } from '../../interfaces/usuarios';
import { LoginService } from '../../servicio/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta',
  standalone:false,
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.css'
})
export class MiCuentaComponent {
usu: IUsuario={} as IUsuario;
nombreUsuario: string = '';
nombre: string="";
contrasena:string="";
email:string="";
rol:number=1;
correcto:boolean=false;
constructor(private login: LoginService, private router: Router){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    this.nombreUsuario =
      state?.['usuario'] || sessionStorage.getItem('usuario') || 'Invitado';
      console.log('USUARIO', this.nombreUsuario);
}
  ngOnInit(): void {
    this.info();
  }
   info(){
    this.login.info(this.nombreUsuario).subscribe({
      next: (data: any) => {
        this.usu=data.type;
        console.log(this.usu);
        this.email=this.usu.email;
        this.contrasena=this.usu.contrasena;
      }
    })
   }
Aceptar () {
      this.nombre=this.usu.nombre;
      this.contrasena=this.usu.contrasena;

       this.login.edit(this.usu.nombre, this.contrasena, this.usu.email)
      .subscribe({
        next: (respuesta) => {
          console.log('Edicion exitosa:', respuesta);
          this.correcto = true;
        },
        error: (error) => {
          console.error('Error al editar:', error);
          this.correcto = false; 
        }
      });
}
}
/* constructor(private login: LoginService, private router: Router) {}

  guardarDatos() {
    this.login.login(this.usuario, this.password).subscribe({
      next: (data: any) => {
        console.log('DATOS', data);
        if (data.type === 1) {
          sessionStorage.setItem('usuario', data.nombre);
          this.router.navigate(['/home']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
    });
  } */