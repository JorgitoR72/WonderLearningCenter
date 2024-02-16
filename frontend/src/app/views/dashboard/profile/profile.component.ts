import { Component } from '@angular/core';
import { LogoutService } from '../../../services/api/security/logout/logout.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(public logoutSecurityService: LogoutService) { }

  public logout() {
    this.logoutSecurityService.logOut();
  }
}
