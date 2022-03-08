import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDestaqueComponent } from './home-destaque.component';

describe('HomeDestaqueComponent', () => {
  let component: HomeDestaqueComponent;
  let fixture: ComponentFixture<HomeDestaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDestaqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
