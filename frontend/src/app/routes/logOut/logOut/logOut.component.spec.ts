/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import { LogOutComponent } from './logOut.component';
import {AuthService} from 'app/shared/services/auth.service';
import {Router} from '@angular/router';

describe('Component: LogOut', () => {
  it('should create an instance', inject([Router, AuthService], (router, authService) => {
    const component = new LogOutComponent(router, authService);
    expect(component).toBeTruthy();
  }));
});
