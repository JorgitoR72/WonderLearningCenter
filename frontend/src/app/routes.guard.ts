import { CanActivateFn } from '@angular/router';

export const routesGuard: CanActivateFn = (route, state) => {
  return true;
};
