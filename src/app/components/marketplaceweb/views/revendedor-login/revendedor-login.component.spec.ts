import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevendedorLoginComponent } from './revendedor-login.component';

describe('RevendedorLoginComponent', () => {
  let component: RevendedorLoginComponent;
  let fixture: ComponentFixture<RevendedorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevendedorLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevendedorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
