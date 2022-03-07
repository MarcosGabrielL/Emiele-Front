import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaProdutoComponent } from './gerencia-produto.component';

describe('GerenciaProdutoComponent', () => {
  let component: GerenciaProdutoComponent;
  let fixture: ComponentFixture<GerenciaProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciaProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
