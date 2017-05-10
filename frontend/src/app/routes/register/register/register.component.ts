import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from '../../../shared/services/register.service';
import { AuthService } from '../../../shared/services/auth.service';

import {User} from '../../../shared/models/user.model';

import { Md5 } from "ts-md5/dist/md5";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private user: User;
  private nameError: boolean;
  private emailError: boolean;
  private usernameError: boolean;
  private passwordsError: boolean;
  private passwordError: boolean;
  private confirmPasswordError: boolean;
  private error: boolean;
  private errorMessage: string;

  constructor(private registerService: RegisterService, private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.initFlags();
  }

  /*
   Initialize error flags

   */
  initFlags() {
      this.nameError = false;
      this.emailError = false;
      this.usernameError= false;
      this.passwordsError = false;
      this.passwordError = false;
      this.confirmPasswordError = false;
      this.error = false;
      this.errorMessage = '';
  }

  /*
    Validates if the second typed password matches first one

   */
  onKeyConfirmPassword(password: string, confirmPassword: string) {
    this.initFlags();
    if (password != confirmPassword) {
      this.passwordError = true;
    }
  }

  /*
    Push new user account
    Validates if all necessary fields are filled

   */
  register(name: string, lastName: string, email: string, username: string, password: string, confirmPassword: string, role: string) {
    this.initFlags();
    if (name == '') {
      this.nameError = true;
    }
    if (email == '') {
      this.emailError = true;
    }
    if (username == '') {
      this.usernameError= true;
    }
    if (password == '') {
      this.passwordsError = true;
    }
    if (confirmPassword == '') {
      this.confirmPasswordError = true;
    }
    if (name == '' || email == '' || username == '' || password == '' || confirmPassword == '') {
      return;
    }
    this.registerService.register({'name': name, 'last_name': lastName, 'email': email, 'user_name': username,
      'password': Md5.hashStr(password), 'role': role})
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
    this.router.navigate(['/events']);
  }

  /*
   Show error message in page

   */
  handleError(error: any) {
    this.error = true;
    this.errorMessage = error.json().message;
  }
}
