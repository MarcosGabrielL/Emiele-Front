import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarsenhaComponent } from './atualizarsenha.component';

describe('AtualizarsenhaComponent', () => {
  let component: AtualizarsenhaComponent;
  let fixture: ComponentFixture<AtualizarsenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarsenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarsenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
