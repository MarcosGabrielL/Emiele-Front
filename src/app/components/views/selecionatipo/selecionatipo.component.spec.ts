import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionatipoComponent } from './selecionatipo.component';

describe('SelecionatipoComponent', () => {
  let component: SelecionatipoComponent;
  let fixture: ComponentFixture<SelecionatipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionatipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionatipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
