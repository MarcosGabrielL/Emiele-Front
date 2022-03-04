import { TestBed } from '@angular/core/testing';

import { ResetpasswordService } from './resetpassword.service';

describe('ResetpasswordService', () => {
  let service: ResetpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
