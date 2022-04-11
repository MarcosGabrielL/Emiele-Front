import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapiohomeComponent } from './cardapiohome.component';

describe('CardapiohomeComponent', () => {
  let component: CardapiohomeComponent;
  let fixture: ComponentFixture<CardapiohomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardapiohomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardapiohomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
