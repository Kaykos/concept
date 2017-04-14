import {Component, OnInit} from '@angular/core';

import {RegisterService} from '../../../shared/services/register.service';

import {User} from '../../../shared/models/user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;

  passwordError: boolean;

  constructor(private registerService: RegisterService) {
    this.user = new User();
    this.passwordError = false;
  }

  ngOnInit() {}

  onKeyConfirmPassword(event: KeyboardEvent, password: string, confirmPassword: string) {
    this.passwordError = false;
    if (password !== confirmPassword) {
      this.passwordError = true;
    }
  }

  register(name: string, lastName: string, email: string, username: string, password: string, role: string) {
    this.registerService.register({'name': name, 'last_name': lastName, 'email': email, 'user_name': username,
      'password': password, 'role': role})
      .subscribe(
        user  => this.user = user);
  }
}
