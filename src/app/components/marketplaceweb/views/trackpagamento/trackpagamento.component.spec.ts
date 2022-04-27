import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackpagamentoComponent } from './trackpagamento.component';

describe('TrackpagamentoComponent', () => {
  let component: TrackpagamentoComponent;
  let fixture: ComponentFixture<TrackpagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackpagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackpagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
