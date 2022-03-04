import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailfailComponent } from './emailfail.component';

describe('EmailfailComponent', () => {
  let component: EmailfailComponent;
  let fixture: ComponentFixture<EmailfailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailfailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailfailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
