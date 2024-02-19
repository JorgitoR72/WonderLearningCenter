import { Component } from '@angular/core';

import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserService } from '../../../../services/api/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService: UserService) { }

  protected form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    birthdate: new FormControl(''),
    role: new FormControl('ROLE_STUDENT'),
  })

  public registerUser() {
    let user = this.form.value;
    this.userService.postNewUser(user).subscribe((res) => {
      console.log(res)
    })
  }
}
