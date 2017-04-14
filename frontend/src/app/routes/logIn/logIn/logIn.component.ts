import {Component, OnInit} from '@angular/core';
import {LogInService} from '../../../shared/services/logIn.service';

import {User} from '../../../shared/models/user.model';
import {SettingsService} from '../../../core/settings/settings.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logIn',
    templateUrl: './logIn.component.html',
    styleUrls: ['./logIn.component.scss']
})
export class LogInComponent implements OnInit{
  user: User;

  usernameError: boolean;
  passwordError: boolean;
  error: boolean;

  constructor(private router: Router, private logInService: LogInService, private settingsService: SettingsService) {
    this.user = new User();
    this.usernameError = false;
    this.passwordError = false;
    this.error = false;
  }

  ngOnInit() {}

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

  updateUser(user: User) {
    this.user = user;
    this.settingsService.setUser(this.user);
    this.settingsService.setIsLogged(true);
    this.router.navigate(['/events']);
  }

  handleError(error: any) {
    console.log(error);
    this.error = true;
  }
}
