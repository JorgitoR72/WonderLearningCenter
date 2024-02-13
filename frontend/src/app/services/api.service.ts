import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public async registerUser(user: any) {
    return this.http.post(environment.url + 'register/new', user).toPromise().then((res: any) => {
      console.log(res)
    })
  }
}
