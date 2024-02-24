import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LoginService } from '../../../services/api/security/login/login.service';
import { UserService } from '../../../services/api/user/user.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private securityLoginService: LoginService, private userService: UserService) { }

  protected form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  public logCheck() {
    let user = this.form.value;
    this.securityLoginService.logCheck(user).pipe(
      switchMap((res: any) => {
        if (typeof res.token === 'string') {
          window.localStorage.setItem('token', res.token);
          return this.userService.getUserbyEmail(user.username);
        } else {
          return this.router.navigate(['security']);
        }
      })
    ).subscribe((userResponse: any) => {
      window.localStorage.setItem('user', JSON.stringify(userResponse));
      if (userResponse.roles[0] !== 'ROLE_STUDENT') {
        window.localStorage.setItem('permissions', 'true');
      }
      this.router.navigate(['dashboard']);
    }, error => {
      console.error("Error:", error); // Maneja el error de getUserbyEmail
    });
  }

}
