import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from '../../../shared/services/register.service';
import { AuthService } from '../../../shared/services/auth.service';

import {User} from '../../../shared/models/user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private user: User;
  private error: boolean;
  private errorMessage: string;
  private nameError: boolean;
  private emailError: boolean;
  private usernameError: boolean;
  private passwordsError: boolean;
  private passwordError: boolean;

  constructor(private registerService: RegisterService, private authService: AuthService, private router: Router) {
    this.user = new User();
    this.error = false;
    this.errorMessage = '';
    this.nameError = false;
    this.emailError = false;
    this.usernameError= false;
    this.passwordsError = false;
    this.passwordError = false;
  }

  /*
    Validates if the second typed password matches first one

   */
  onKeyConfirmPassword(password: string, confirmPassword: string) {
    this.passwordError = false;
    if (password !== confirmPassword) {
      this.passwordError = true;
    }
  }

  /*
    Push new user account
    Validates if the fields email and username are uniques
    Validates if all necessary fields are filled

   */
  register(name: string, lastName: string, email: string, username: string, password: string, role: string) {
    this.error = false;
    this.errorMessage = '';
    this.nameError = false;
    this.emailError = false;
    this.usernameError= false;
    this.passwordsError = false;
    if (name === '') {
      this.nameError = true;
    }
    if (email === '') {
      this.emailError = true;
    }
    if (username === '') {
      this.usernameError= true;
    }
    if (password === '') {
      this.passwordsError = true;
    }
    if (name === '' || email === '' || username === '' || password === '') {
      return;
    }
    this.registerService.register({'name': name, 'last_name': lastName, 'email': email, 'user_name': username,
      'password': password, 'role': role})
      .subscribe(
        (user: User)  => { this.updateUser(user); },
        error => this.handleError(error));
  }

  /*
   Update user session
   Redirects to events page

   */
  updateUser(user: User) {
    this.user = user;
    this.authService.setCurrentUser(this.user);
    this.router.navigate(['/services']);
  }

  /*
   Show error message in page

   */
  handleError(error: any) {
    this.error = true;
    this.errorMessage = error.json().message;
  }
}
