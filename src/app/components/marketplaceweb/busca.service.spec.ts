import { TestBed } from '@angular/core/testing';

import { BuscaService } from './busca.service';

describe('BuscaService', () => {
  let service: BuscaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
