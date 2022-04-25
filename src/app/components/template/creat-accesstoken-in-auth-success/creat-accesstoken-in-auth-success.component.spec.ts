import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatAccesstokenInAuthSuccessComponent } from './creat-accesstoken-in-auth-success.component';

describe('CreatAccesstokenInAuthSuccessComponent', () => {
  let component: CreatAccesstokenInAuthSuccessComponent;
  let fixture: ComponentFixture<CreatAccesstokenInAuthSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatAccesstokenInAuthSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatAccesstokenInAuthSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
