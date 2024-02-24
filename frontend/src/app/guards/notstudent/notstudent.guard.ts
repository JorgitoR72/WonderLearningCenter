import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable()

class NotStudentPermissions {

  constructor(private router: Router) { }

  canActivate(): any {
    let permissions: any = window.localStorage.getItem('permissions')
    if (permissions) {
      return true
    } else {
      this.router.navigate(['dashboard'])
      return false
    }
  }
}

export const notstudentGuard: CanActivateFn = (route, state) => {
  const permissionsService = new NotStudentPermissions(new Router);
  return permissionsService.canActivate();
};
