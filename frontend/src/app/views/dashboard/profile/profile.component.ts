import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router: Router) { }

  public logOut() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('email')
    this.router.navigate(['site']);
  }
}
