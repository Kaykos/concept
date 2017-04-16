import {Component, OnInit} from '@angular/core';

import {AuthService} from 'app/shared/services/auth.service';

import {User} from '../../../shared/models/user.model';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private user: User;

  constructor(private authService: AuthService) {
    this.user = new User();
  }

  /*
    Get current user information
    If there is not an active session, user is defined as guest

   */
  ngOnInit() {
    this.user = this.authService.getCurrentUser();
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
