import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../shared/services/users.service';
import { AuthService } from '../../../shared/services/auth.service';

import { User } from '../../../shared/models/user.model';

import { Md5 } from "ts-md5/dist/md5";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private user: User;

  private emailError: boolean;
  private passwordError: boolean;
  private passwordsError: boolean;

  private errorPassword: boolean;
  private errorEmail: boolean;
  private errorDelete: boolean;
  private errorMessage: string;

  private passwordChanged: boolean;
  private emailChanged: boolean;

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) {
    this.initFlags();
  }

  /*
    Initializa error and update flags

   */
  initFlags() {
    this.errorPassword = false;
    this.errorEmail = false;
    this.errorDelete = false;
    this.errorMessage = '';
    this.emailError = false;
    this.passwordError = false;
    this.passwordsError = false;
    this.passwordChanged = false;
    this.emailChanged = false;
    this.errorMessage = '';
  }

  /*
    Get current user

   */
  ngOnInit() {
    this.user = this.authService.getCurrentUser();
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
    Send request to update user password

   */
  updatePassword(password: string) {
    this.initFlags();
    if (password == '') {
      this.passwordsError = true;
      return;
    }
    this.usersService.update(this.user.id, {'password': Md5.hashStr(password)})
      .subscribe(
        (user: User)  => { this.managePassword(user) },
        error => this.handleErrorPassword(error));
  }

  /*
    Handle events when password is changed

   */
  managePassword(user: User) {
    this.user = user;
    this.passwordChanged = true;
  }

  /*
   Show password error message in page

   */
  handleErrorPassword(error: any) {
    this.initFlags();
    this.errorPassword = true;
    this.errorMessage = error.json().message;
  }

  /*
   Send request to update user email

   */
  updateEmail(email: string) {
    this.initFlags();
    if (email == '') {
      this.emailError = true;
      return;
    }
    this.usersService.update(this.user.id, {'email': email})
      .subscribe(
        (user: User)  => { this.manageEmail(user) },
        error => this.handleErrorEmail(error));
  }

  /*
   Handle events when email is changed

   */
  manageEmail(user: User) {
    this.user = user;
    this.emailChanged = true;
  }

  /*
   Show email error message in page

   */
  handleErrorEmail(error: any) {
    this.initFlags();
    this.errorEmail = true;
    this.errorMessage = error.json().message;
  }

  /*
    Send request to delete user

   */
  deleteUser() {
    this.initFlags();
    this.usersService.delete(this.user.id)
      .subscribe(
        success  => { this.manageDelete() },
        error => this.handleErrorDelete(error));
  }

  /*
    Handle events when user is deleted

   */
  manageDelete() {
    this.authService.clear();
    this.router.navigate(['/logIn']);
  }

  /*
   Show email error message in page

   */
  handleErrorDelete(error: any) {
    this.initFlags();
    this.errorDelete = true;
    this.errorMessage = error.json().message;
  }
}
