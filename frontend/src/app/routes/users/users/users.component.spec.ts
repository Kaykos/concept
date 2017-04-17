/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {Router} from '@angular/router';

import { UsersComponent } from './users.component';
import {UsersService} from '../../../shared/services/users.service';
import {AuthService} from '../../../shared/services/auth.service';

describe('Component: Users', () => {
  it('should create an instance', inject([UsersService, AuthService, Router], (usersService, authService, router) => {
    const component = new UsersComponent(usersService, authService, router);
    expect(component).toBeTruthy();
  }));
});
