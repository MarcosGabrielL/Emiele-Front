import { TestBed } from '@angular/core/testing';

import { VerifyidentityService } from './verifyidentity.service';

describe('VerifyidentityService', () => {
  let service: VerifyidentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyidentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
