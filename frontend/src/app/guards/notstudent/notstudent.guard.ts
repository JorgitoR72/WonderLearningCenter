import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable()

class NotStudentPermissions {

  constructor(private router: Router) { }

  canActivate(): any {
    let user: any = window.localStorage.getItem('user')
    user = JSON.parse(user)
    const userRole = user.roles[0]
    if (userRole !== 'ROLE_STUDENT') {
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
