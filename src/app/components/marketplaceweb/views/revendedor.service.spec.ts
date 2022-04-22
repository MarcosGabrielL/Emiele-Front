import { TestBed } from '@angular/core/testing';

import { RevendedorService } from './revendedor.service';

describe('RevendedorService', () => {
  let service: RevendedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevendedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
