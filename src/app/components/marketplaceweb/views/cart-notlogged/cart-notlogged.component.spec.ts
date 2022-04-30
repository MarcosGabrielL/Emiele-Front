import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartNotloggedComponent } from './cart-notlogged.component';

describe('CartNotloggedComponent', () => {
  let component: CartNotloggedComponent;
  let fixture: ComponentFixture<CartNotloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartNotloggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartNotloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
