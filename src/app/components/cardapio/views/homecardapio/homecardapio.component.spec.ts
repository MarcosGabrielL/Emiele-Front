import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecardapioComponent } from './homecardapio.component';

describe('HomecardapioComponent', () => {
  let component: HomecardapioComponent;
  let fixture: ComponentFixture<HomecardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomecardapioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
