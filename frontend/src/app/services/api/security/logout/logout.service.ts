import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  public async logOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('email');
    this.router.navigate(['site']);
  }
}
