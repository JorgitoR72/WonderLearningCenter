import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

class PermissionsService {

  constructor(private router: Router) { }

  canActivate(): any {
    const token = localStorage.getItem('token')
    if (token!) {
      return true
    } else {
      this.router.navigate(['security/login'], { queryParams: {} })
      return false
    }
  }
}

export const routesGuard: CanActivateFn = (route, state) => {
  const permissionsService = new PermissionsService(new Router);
  return permissionsService.canActivate();

};
