import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EstaticosModule } from './estaticos/estaticos.module';
import { ComponentModule } from './componentes/component.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EstaticosModule, RouterModule, ComponentModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TFG-DAW';
}
