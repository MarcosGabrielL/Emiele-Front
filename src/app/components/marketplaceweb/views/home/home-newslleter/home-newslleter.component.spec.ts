import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewslleterComponent } from './home-newslleter.component';

describe('HomeNewslleterComponent', () => {
  let component: HomeNewslleterComponent;
  let fixture: ComponentFixture<HomeNewslleterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeNewslleterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNewslleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
