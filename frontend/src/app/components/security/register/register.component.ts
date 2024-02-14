import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private apiService: ApiService) { }

  protected form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  public async registerUser() {
    let user = this.form.value;
    this.apiService.registerUser(user);
  }
}
