import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevendedorTransacoesComponent } from './revendedor-transacoes.component';

describe('RevendedorTransacoesComponent', () => {
  let component: RevendedorTransacoesComponent;
  let fixture: ComponentFixture<RevendedorTransacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevendedorTransacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevendedorTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
