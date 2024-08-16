import { TestBed } from '@angular/core/testing';

import { EcoAguaService } from './eco-agua.service';

describe('EcoAguaService', () => {
  let service: EcoAguaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcoAguaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
