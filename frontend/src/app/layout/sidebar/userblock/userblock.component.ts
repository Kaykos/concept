import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserblockService } from './userblock.service';
import { AuthService } from '../../../shared/services/auth.service';

import { User } from 'app/shared/models/user.model';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html'
})
export class UserblockComponent implements OnInit, OnDestroy {
  private subscription: any;
  private user: User;

  constructor(private userblockService: UserblockService, private authService: AuthService, private router: Router) {
  }

  /*
    Suscribe to subject
    Ask if there is a user logged in
    If it's true, retrieve information
    If it's false, set default user

   */
  ngOnInit() {
    this.subscription = this.authService.getUserSubject().subscribe((user: User) => { this.updateUser(user); });
    this.user = this.authService.getCurrentUser();
  }

  /*
    Destroy subscription

   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }

  /*
   Update user information
   If there is no user logged, set user as guest

   */
  updateUser(user: User) {
    this.user = user;
  }

  /*
    Route deppending on role
    Guest -> /logIn
    User -> /users

   */
  imageClick() {
    if (this.user.role == 'invitado') {
      this.router.navigate(['/logIn']);
    }
    else {
      this.router.navigate(['/users']);
    }
  }
}
