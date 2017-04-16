import {Component, OnInit} from '@angular/core';
import {LogInService} from '../../../shared/services/logIn.service';
import {Router} from '@angular/router';

import {User} from '../../../shared/models/user.model';

import {AuthService} from '../../../shared/services/auth.service';

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
    this.usernameError = false;
    this.passwordError = false;
    this.error = false;
    this.errorMessage = '';
  }

  ngOnInit() {}

  /*
    Request if user has an account
    Validates if the username and password isn't empty
    Validates if username and password are registered

   */
  logIn(username: string, password: string) {
    this.usernameError = false;
    this.passwordError = false;
    this.error = false;
    if (username === '') {
      this.usernameError = true;
    }
    if (password === '') {
      this.passwordError = true;
    }
    if (username === '' || password === '') {
      return;
    }
    this.logInService.logIn(username, {'password': password})
      .subscribe(
        (user: User)  => { this.updateUser(user); },
        error => this.handleError(error));
  }

  /*
    Update user session and redirects to events page

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
