import { Component } from '@angular/core';
import { FootercontactComponent } from '../../../components/site/footer/footercontact/footercontact.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FootercontactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
