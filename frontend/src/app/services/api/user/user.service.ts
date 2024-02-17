import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(environment.url + 'api/user/search/all');
  }

  public getUserbyEmail(email: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('email', email);
    return this.http.get<any>(environment.url + 'api/user/search/detail', { params: params });
  }
}
