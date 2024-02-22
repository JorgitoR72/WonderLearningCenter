import { Component } from '@angular/core';
import { LogoutService } from '../../../../services/api/security/logout/logout.service';
import { UserService } from '../../../../services/api/user/user.service';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent {
  constructor(public logoutSecurityService: LogoutService, public userService: UserService) { }

  public user: any
  public logout() {
    this.logoutSecurityService.logOut();
  }

  public getUserData() {
    const userJSON: any = window.localStorage.getItem('user');
    this.user = JSON.parse(userJSON)
  }

  ngOnInit() {
    this.getUserData()
  }
}
