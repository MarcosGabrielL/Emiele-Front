import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDestaqueFestividadeComponent } from './home-destaque-festividade.component';

describe('HomeDestaqueFestividadeComponent', () => {
  let component: HomeDestaqueFestividadeComponent;
  let fixture: ComponentFixture<HomeDestaqueFestividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDestaqueFestividadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDestaqueFestividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
