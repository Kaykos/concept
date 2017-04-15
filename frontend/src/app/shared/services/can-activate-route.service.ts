import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthService} from './auth.service';
import {Logger} from './logger.service';

import {User} from '../models/user.model';

@Injectable()
export class CanActivateRouteService implements CanActivate{

  constructor(private router: Router,
              private authService: AuthService,
              private logger: Logger){}

  canActivate(){
    const user: User = this.authService.getCurrentUser();
    this.logger.info('canActivate', user);
    if(user){
      this.logger.info('canActivate entro');
      return true;
    }
    this.logger.info('canActivate NO entro');
    this.router.navigate(['/logIn']);
    return false;
  }
}
