import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private apiService: ApiService) { }

  protected form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  public logCheck() {
    let user = this.form.value;
    this.apiService.logCheck(user);
  }
}
