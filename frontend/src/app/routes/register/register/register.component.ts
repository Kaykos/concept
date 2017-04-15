import {Component, OnInit} from '@angular/core';

import {RegisterService} from '../../../shared/services/register.service';

import {User} from '../../../shared/models/user.model';
import {SettingsService} from '../../../core/settings/settings.service';

import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private user: User;
  private error: boolean;
  private errorMessage: string;
  private passwordError: boolean;

  constructor(private router: Router, private registerService: RegisterService, private settingsService: SettingsService) {
    this.user = new User();
    this.error = false;
    this.errorMessage = '';
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
    this.error = false;
    this.registerService.register({'name': name, 'last_name': lastName, 'email': email, 'user_name': username,
      'password': password, 'role': role})
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
    this.error = true;
    this.errorMessage = error.json().message;
  }
}
