import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UsersService} from '../../../shared/services/users.service';
import {AuthService} from '../../../shared/services/auth.service';

import {User} from '../../../shared/models/user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private user: User;
  private error: boolean;
  private errorMessage: string;
  private emailError: boolean;
  private passwordsError: boolean;
  private passwordError: boolean;

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) {
    this.user = new User();
    this.error = false;
    this.errorMessage = '';
    this.emailError = false;
    this.passwordError = false;
    this.passwordError = false;
  }

  ngOnInit() {}

  /*
    Validates if the second typed password matches first one

   */
  onKeyConfirmPassword(event: KeyboardEvent, password: string, confirmPassword: string) {
    this.passwordError = false;
    if (password !== confirmPassword) {
      this.passwordError = true;
    }
  }

  /*
   Show error message in page

   */
  handleError(error: any) {
    this.error = true;
    this.errorMessage = error.json().message;
  }
}
