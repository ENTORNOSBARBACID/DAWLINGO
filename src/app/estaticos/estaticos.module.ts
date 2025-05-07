import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';



@NgModule({
  declarations: [ FooterComponent, HeaderComponent, BarraLateralComponent],
  imports: [
    CommonModule
  ],
  exports: [FooterComponent, HeaderComponent, BarraLateralComponent]
})
export class EstaticosModule { }
