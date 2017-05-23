import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LogInService } from '../../../shared/services/logIn.service';
import { AuthService } from '../../../shared/services/auth.service';

import { User } from '../../../shared/models/user.model';

import { Md5 } from "ts-md5/dist/md5";

@Component({
    selector: 'app-logIn',
    templateUrl: './logIn.component.html',
    styleUrls: ['./logIn.component.scss']
})
export class LogInComponent implements OnInit {
  private user: User;

  private usernameError: boolean;
  private passwordError: boolean;
  private error: boolean;
  private errorMessage: string;

  constructor(private logInService: LogInService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initFlags();
  }

  /*
    Initialize error flags

   */
  initFlags() {
    this.usernameError = false;
    this.passwordError = false;
    this.error = false;
    this.errorMessage = '';
  }

  /*
    Request if user has an account

   */
  logIn(username: string, password) {
    this.initFlags();
    let flag = false;
    if (username == '') {
      this.usernameError = true;
      flag = true;
    }
    if (password.value == '') {
      this.passwordError = true;
      flag = true;
    }
    if (flag) {
      password.value = null;
      return;
    }
    this.logInService.logIn(username, {'password': Md5.hashStr(password.value)})
      .subscribe(
        (user: User)  => { this.updateUser(user); },
        (error) => { this.handleError(error); });
    password.value = null;
  }

  /*
    Update user session and redirects to events page

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

  /*
    Redirect to register page

   */
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
