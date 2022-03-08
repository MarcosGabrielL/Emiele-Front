import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDestaqueHojeComponent } from './home-destaque-hoje.component';

describe('HomeDestaqueHojeComponent', () => {
  let component: HomeDestaqueHojeComponent;
  let fixture: ComponentFixture<HomeDestaqueHojeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDestaqueHojeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDestaqueHojeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
