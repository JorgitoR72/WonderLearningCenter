import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgStyle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public menuIsActive: boolean = false;

  public logged: any = window.localStorage.getItem('user')
  public user: any = JSON.parse(this.logged)

  public menuSubActive: boolean = false;


  toggleMenu() {
    this.menuIsActive = !this.menuIsActive;
  }

  toggleSubMenu() {
    this.menuSubActive = !this.menuSubActive;
  }
}
