import { TestBed } from '@angular/core/testing';

import { HttpQuotationService } from './http-quotation.service';

describe('HttpQuotationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpQuotationService = TestBed.get(HttpQuotationService);
    expect(service).toBeTruthy();
  });
});
