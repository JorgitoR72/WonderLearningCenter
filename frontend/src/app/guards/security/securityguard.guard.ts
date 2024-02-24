import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment';


class SecuriryPermissions {

  constructor(private router: Router) { }

  canActivate(): any {
    const logged = window.localStorage.getItem('token')
    if (logged) {
      this.router.navigate(['dashboard'])
      return false
    } else {
      return true
    }
  }
}

export const securityguardGuard: CanActivateFn = (route, state) => {
  const permissionsService = new SecuriryPermissions(new Router);
  return permissionsService.canActivate();
};
