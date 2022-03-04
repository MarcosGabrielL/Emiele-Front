import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsucessComponent } from './emailsucess.component';

describe('EmailsucessComponent', () => {
  let component: EmailsucessComponent;
  let fixture: ComponentFixture<EmailsucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsucessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
