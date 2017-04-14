import {Component, OnInit} from '@angular/core';
import {LogInService} from '../../../shared/services/logIn.service';

import {User} from '../../../shared/models/user.model';

@Component({
    selector: 'app-logIn',
    templateUrl: './logIn.component.html',
    styleUrls: ['./logIn.component.scss']
})
export class LogInComponent implements OnInit{
  user: User;

  usernameError: boolean;
  passwordError: boolean;

  constructor(private logInService: LogInService) {
    this.user = new User();
    this.usernameError = false;
    this.passwordError = false;
  }

  ngOnInit() {}

  logIn(username: string, password: string) {
    this.usernameError = false;
    this.passwordError = false;
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
        user  => this.user = user);
  }
}
