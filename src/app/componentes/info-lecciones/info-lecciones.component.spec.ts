import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLeccionesComponent } from './info-lecciones.component';

describe('InfoLeccionesComponent', () => {
  let component: InfoLeccionesComponent;
  let fixture: ComponentFixture<InfoLeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoLeccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoLeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
