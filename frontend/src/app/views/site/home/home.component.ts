import { Component } from '@angular/core';
import { FooterhomeComponent } from '../../../components/site/footer/footerhome/footerhome.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterhomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() { }
}
