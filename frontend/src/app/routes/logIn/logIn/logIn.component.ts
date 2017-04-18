import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LogInService } from '../../../shared/services/logIn.service';
import { AuthService } from '../../../shared/services/auth.service';

import { User } from '../../../shared/models/user.model';

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

  constructor(private logInService: LogInService, private authService: AuthService, private router: Router) {
    this.user = new User();
  }

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
    Validates if the username or password are empty

   */
  logIn(username: string, password: string) {
    this.initFlags();
    if (username == '') {
      this.usernameError = true;
    }
    if (password == '') {
      this.passwordError = true;
    }
    if (username == '' || password == '') {
      return;
    }
    this.logInService.logIn(username, {'password': password})
      .subscribe(
        (user: User)  => { this.updateUser(user); },
        error => this.handleError(error));
  }

  /*
    Update user session and redirects to events page
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
