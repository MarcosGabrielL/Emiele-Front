import { TestBed } from '@angular/core/testing';

import { PerfilpagamentoService } from './perfilpagamento.service';

describe('PerfilpagamentoService', () => {
  let service: PerfilpagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilpagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
