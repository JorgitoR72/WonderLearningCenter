import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  public async logCheck(user: any) {
    return this.http.post(environment.url + 'api/login_check', user).toPromise().then((res: any) => {
      if (typeof res.token === 'string') {
        window.localStorage.setItem('token', res.token);
        window.localStorage.setItem('email', user.username);
        this.router.navigate(['dashboard']);
      }
    })
  }
}
