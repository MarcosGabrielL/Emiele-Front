import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaCategoriaComponent } from './busca-categoria.component';

describe('BuscaCategoriaComponent', () => {
  let component: BuscaCategoriaComponent;
  let fixture: ComponentFixture<BuscaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
