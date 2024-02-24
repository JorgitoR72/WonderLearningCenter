import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LogoutService } from '../../services/api/security/logout/logout.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(public logoutSecurityService: LogoutService) { }

  public logout() {
    this.logoutSecurityService.logOut();
  }

  public permissions: any = window.localStorage.getItem('permissions')


  public expand() {
    const sidebar: any = document.querySelector("#sidebar")
    sidebar.classList.toggle("expand");
  }

}
