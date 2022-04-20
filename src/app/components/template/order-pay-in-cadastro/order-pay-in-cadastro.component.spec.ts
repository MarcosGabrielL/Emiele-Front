import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPayInCadastroComponent } from './order-pay-in-cadastro.component';

describe('OrderPayInCadastroComponent', () => {
  let component: OrderPayInCadastroComponent;
  let fixture: ComponentFixture<OrderPayInCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPayInCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPayInCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
