import { Component } from '@angular/core';
import { LogoutService } from '../../../services/api/security/logout/logout.service';
import { UserService } from '../../../services/api/user/user.service';
import { environment } from '../../../../environments/environment';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}

