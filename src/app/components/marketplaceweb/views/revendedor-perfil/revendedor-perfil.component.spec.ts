import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevendedorPerfilComponent } from './revendedor-perfil.component';

describe('RevendedorPerfilComponent', () => {
  let component: RevendedorPerfilComponent;
  let fixture: ComponentFixture<RevendedorPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevendedorPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevendedorPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
