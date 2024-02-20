import { Component } from '@angular/core';
import { FooterhomeComponent } from '../../../components/site/footer/footerhome/footerhome.component';
import {NgxTypedJsModule} from 'ngx-typed-js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterhomeComponent, NgxTypedJsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() { }
}
