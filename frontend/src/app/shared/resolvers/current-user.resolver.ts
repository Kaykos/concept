import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {Response} from '@angular/http';

import {AuthService} from '../services/auth.service';
import {UsersService} from '../services/users.service';

import {User} from '../models/user.model';

@Injectable()
export class CurrentUserResolver implements Resolve<User>{
  constructor(private router: Router,
              private authService: AuthService,
              private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<User> | User{
    const user: User = this.authService.getCurrentUser();
    if (user) {
      return user;
    }

    return this.usersService.getCurrentUser()
      .toPromise()
      .then((user: User) => {
        if (user) {
          this.authService.setCurrentUser(user);
        }
        return user;
      })
      .catch((response: Response) => {
        if (response.status === 404) {
          // Error 404
          this.router.navigate(['/error404']);
          return false;
        }
        else {
          // Error 500
          this.router.navigate(['/error500']);
          return false;
        }
      });
  }
}
