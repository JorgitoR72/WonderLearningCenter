import { TestBed } from '@angular/core/testing';

import { RoutesguardService } from './routesguard.service';

describe('RoutesguardService', () => {
  let service: RoutesguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
