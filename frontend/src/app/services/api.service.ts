import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  public async registerUser(user: any) {
    return this.http.post(environment.url + 'register/new', user).toPromise().then((res: any) => {
      console.log(res)
    })
  }
}
