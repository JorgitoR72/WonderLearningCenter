import { Component } from '@angular/core';
import { Location, NgStyle} from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  ruta: string = '';
  constructor(private location: Location) {
    this.ruta = this.location.path();
  }
}
