import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcardInCadastroComponent } from './getcard-in-cadastro.component';

describe('GetcardInCadastroComponent', () => {
  let component: GetcardInCadastroComponent;
  let fixture: ComponentFixture<GetcardInCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetcardInCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcardInCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
