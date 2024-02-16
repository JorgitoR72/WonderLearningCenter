import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/site/header/header.component';
import { FooterComponent } from '../../components/site/footer/footer.component';


@Component({
  selector: 'app-site',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {

}
