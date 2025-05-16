import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EstaticosModule } from './estaticos/estaticos.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EstaticosModule, RouterModule], // Aquí se eliminó NgModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Ajusté el nombre de styleUrls
})
export class AppComponent {
  title = 'TFG-DAW';
}
