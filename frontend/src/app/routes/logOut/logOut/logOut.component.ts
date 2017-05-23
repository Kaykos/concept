import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-logOut',
  template: ''
})
export class LogOutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  /*
    Close session by restoring user's data as null
    Redirect to log in page

   */
  ngOnInit() {
    this.authService.clear();
    this.router.navigate(['/logIn']);
  }
}
