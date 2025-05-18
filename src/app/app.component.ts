import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EstaticosModule } from './estaticos/estaticos.module';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EstaticosModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TFG-DAW';
}
