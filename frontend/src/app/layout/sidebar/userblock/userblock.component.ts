import {Component, OnDestroy, OnInit} from '@angular/core';

import { UserblockService } from './userblock.service';
import { AuthService } from '../../../shared/services/auth.service';

import { User } from 'app/shared/models/user.model';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit, OnDestroy {
    private user: User;
    private subscription: any;

    constructor(private userblockService: UserblockService, private authService: AuthService) {
        this.user = new User();

        this.user = {
          id: 0,
          name: 'Guest',
          lastName: ' ',
          email: ' ',
          username: 'guest',
          role: 'guest'
        };
    }

    /*
      Suscribe to subject

     */
    ngOnInit() {
        this.subscription = this.authService.getUserSubject().subscribe((user: User) => { this.updateUser(user); } );
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
      If there is no user logged, set guest information

     */
    updateUser(user: User) {
      this.user = user;
      if (this.user == null) {
        this.user = {
          id: 0,
          name: 'Guest',
          lastName: ' ',
          email: ' ',
          username: 'guest',
          role: 'guest'
        };
      }
    }
}
