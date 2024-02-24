import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  public async logOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('permissions');
    this.router.navigate(['security']);
  }
}
