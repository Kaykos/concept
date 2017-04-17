import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

import { User } from '../models/user.model';

@Injectable()
export class CanActivateRouteService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    const user: User = this.authService.getCurrentUser();
    if (user) {
      return true;
    }
    this.router.navigate(['/logIn']);
    return false;
  }
}
