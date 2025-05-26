import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoNivelesComponent } from './curso-niveles.component';

describe('CursoNivelesComponent', () => {
  let component: CursoNivelesComponent;
  let fixture: ComponentFixture<CursoNivelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoNivelesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
