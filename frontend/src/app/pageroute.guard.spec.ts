import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pagerouteGuard } from './pageroute.guard';

describe('pagerouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pagerouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
