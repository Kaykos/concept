import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../../shared/models/user.model';

import {AuthService} from '../../../shared/services/auth.service';

@Component({
    selector: 'app-logOut',
    template: ''
})
export class LogOutComponent implements OnInit {
  private user: User;

  constructor(private router: Router, private authService: AuthService) {
  }

  /*
    Close session by restoring user's data as null

   */
  ngOnInit() {
      this.authService.clear();
      this.router.navigate(['/logIn']);
  }
}
