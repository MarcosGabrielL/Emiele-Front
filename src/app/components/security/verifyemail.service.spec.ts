import { TestBed } from '@angular/core/testing';

import { VerifyemailService } from './verifyemail.service';

describe('VerifyemailService', () => {
  let service: VerifyemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
