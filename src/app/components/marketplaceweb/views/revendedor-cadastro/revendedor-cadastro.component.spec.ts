import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevendedorCadastroComponent } from './revendedor-cadastro.component';

describe('RevendedorCadastroComponent', () => {
  let component: RevendedorCadastroComponent;
  let fixture: ComponentFixture<RevendedorCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevendedorCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevendedorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
