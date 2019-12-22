import { TestBed } from '@angular/core/testing';

import { HttpCategoryService } from './http-category.service';

describe('HttpCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCategoryService = TestBed.get(HttpCategoryService);
    expect(service).toBeTruthy();
  });
});
