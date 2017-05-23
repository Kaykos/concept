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
  private confirmPasswordError: boolean;

  private errorPassword: boolean;
  private errorEmail: boolean;
  private errorDelete: boolean;
  private errorFormat: boolean;
  private errorMessage: string;

  private passwordChanged: boolean;
  private emailChanged: boolean;
  private imageChanged: boolean;

  private imageData: string;
  private extension: string;

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) {
    this.initFlags();
  }

  /*
    Initialize flag values

   */
  initFlags() {
    this.errorPassword = false;
    this.errorEmail = false;
    this.errorDelete = false;
    this.errorFormat = false;
    this.errorMessage = '';
    this.emailError = false;
    this.passwordError = false;
    this.passwordsError = false;
    this.confirmPasswordError = false;
    this.passwordChanged = false;
    this.emailChanged = false;
    this.imageChanged = false;
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
  updatePassword(password, confirmPassword) {
    this.initFlags();
    let flag = false;
    if(password.value == '') {
      this.passwordsError = true;
      flag = true;
    }
    if(confirmPassword.value == '') {
      this.confirmPasswordError = true;
      flag = true;
    }
    if(flag) {
      password.value = null;
      confirmPassword.value = null;
      return;
    }
    this.usersService.update(this.user.id, {'password': Md5.hashStr(password.value)})
      .subscribe(
        (user: User)  => { this.managePassword(user) });
    password.value = null;
    confirmPassword.value = null;
  }

  /*
    Handle events when password is changed

   */
  managePassword(user: User) {
    this.user = user;
    this.passwordChanged = true;
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
        (error) => { this.handleErrorEmail(error); });
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
        (success)  => { this.manageDelete(); });
  }

  /*
    Handle events when user is deleted

   */
  manageDelete() {
    this.authService.clear();
    this.router.navigate(['/logIn']);
  }

  /*
   Send request to update user image

   */
  updateImage() {
    this.initFlags();
    this.usersService.update(this.user.id, {'image_data': this.imageData, 'extension': this.extension})
      .subscribe((user: User)  => { this.manageImage(user); });
  }

  /*
   Handle events when image is changed

   */
  manageImage(user: User) {
    this.user = user;
    this.authService.setCurrentUser(this.user);
    this.imageChanged = true;
  }

  /*
   Listen to file uploader event

   */
  changeListener(event) {
    var files = event.target.files;
    var file = files[0];
    var extension;
    this.extension = '';
    this.imageData = '';
    this.errorFormat = false;
    if(files && file) {
      extension = file.name.match(/\.(.+)$/)[1].toLowerCase();
      if(extension == 'jpg' || extension == 'jpeg' || extension == 'png') {
        this.extension = extension;
        var reader = new FileReader();
        reader.onloadend = (e) => {
          this.imageData = reader.result;
          this.updateImage();
        }
        reader.readAsDataURL(file);
      }
      else {
        this.imageData = '';
        this.errorFormat = true;
      }
    }
  }
}
