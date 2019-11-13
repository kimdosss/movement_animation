import { TestBed } from '@angular/core/testing';

import { D3ChartsService } from './d3-charts.service';

describe('D3ChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: D3ChartsService = TestBed.get(D3ChartsService);
    expect(service).toBeTruthy();
  });
});
