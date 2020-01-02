import { TestBed } from '@angular/core/testing';

import { HttpCustomerService } from './http-customer.service';

describe('HttpCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCustomerService = TestBed.get(HttpCustomerService);
    expect(service).toBeTruthy();
  });
});
