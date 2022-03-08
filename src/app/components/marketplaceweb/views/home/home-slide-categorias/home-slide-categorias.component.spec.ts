import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSlideCategoriasComponent } from './home-slide-categorias.component';

describe('HomeSlideCategoriasComponent', () => {
  let component: HomeSlideCategoriasComponent;
  let fixture: ComponentFixture<HomeSlideCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSlideCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSlideCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
