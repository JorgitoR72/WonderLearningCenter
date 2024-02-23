import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient, private router: Router) { }

  public getAllSubjects(): Observable<any> {
    return this.http.get<any>(environment.url + 'api/subject/search/all');
  }

  public postNewFile(id: number, subject: any): Observable<any> {
    return this.http.post<any>(environment.url + 'api/subject/new/file/' + id, subject);
  }
}
