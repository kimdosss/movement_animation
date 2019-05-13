import { TestBed } from '@angular/core/testing';

import { SdofService } from './sdof.service';

describe('SdofService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SdofService = TestBed.get(SdofService);
    expect(service).toBeTruthy();
  });
});
