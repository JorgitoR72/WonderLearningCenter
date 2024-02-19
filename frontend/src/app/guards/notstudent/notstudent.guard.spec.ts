import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notstudentGuard } from './notstudent.guard';

describe('notstudentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notstudentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
