import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { UserblockService } from './userblock.service';
import { AuthService } from '../../../shared/services/auth.service';

import { User } from 'app/shared/models/user.model';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html'
})
export class UserblockComponent implements OnInit, OnDestroy {
    private user: User;
    private subscription: any;

    /*
      Set default user

     */
    constructor(private userblockService: UserblockService, private authService: AuthService, private router: Router) {
        this.user = new User();

        this.user = {
          id: 0,
          name: 'Invitado',
          lastName: '',
          email: '',
          username: '',
          role: 'invitado'
        };
    }

    /*
      Suscribe to subject

     */
    ngOnInit() {
      this.subscription = this.authService.getUserSubject().subscribe((user: User) => { this.updateUser(user); });
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
      if (this.user == null) {
        this.user = {
          id: 0,
          name: 'Invitado',
          lastName: '',
          email: '',
          username: '',
          role: 'invitado'
        };
      }
    }

    imageClick() {
      if (this.user.role == 'invitado') {
        this.router.navigate(['/logIn']);
      }
      else {
        this.router.navigate(['/users']);
      }
    }
}
