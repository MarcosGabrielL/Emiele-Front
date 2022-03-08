import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDestaqueTopvisitComponent } from './home-destaque-topvisit.component';

describe('HomeDestaqueTopvisitComponent', () => {
  let component: HomeDestaqueTopvisitComponent;
  let fixture: ComponentFixture<HomeDestaqueTopvisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDestaqueTopvisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDestaqueTopvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
