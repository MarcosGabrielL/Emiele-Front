import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClientComponent } from './login-client.component';

describe('LoginClientComponent', () => {
  let component: LoginClientComponent;
  let fixture: ComponentFixture<LoginClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
