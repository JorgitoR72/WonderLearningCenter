import { Component } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuIsActive: boolean = false;

  toggleMenu() {
    this.menuIsActive = !this.menuIsActive;
  }
}
