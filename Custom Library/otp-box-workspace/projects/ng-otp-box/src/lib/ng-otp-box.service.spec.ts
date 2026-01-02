import { TestBed } from '@angular/core/testing';

import { NgOtpBoxService } from './ng-otp-box.service';

describe('NgOtpBoxService', () => {
  let service: NgOtpBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgOtpBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
