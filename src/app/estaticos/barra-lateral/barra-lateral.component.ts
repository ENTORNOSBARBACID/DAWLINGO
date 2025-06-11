import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barralateral',
  standalone: false,
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css'
})
export class BarraLateralComponent {
  @Input() rol: any;
}
