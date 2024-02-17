import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient, private router: Router) { }

  public getAllDetails(): Observable<any> {
    return this.http.get<any>(environment.url + 'api/detail/search/all');
  }
}
