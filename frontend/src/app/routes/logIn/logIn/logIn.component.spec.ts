/* tslint:disable:no-unused-variable */

import { LogInComponent } from './logIn.component';

import { LogInService } from '../../../shared/services/logIn.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core/testing';

describe('Component: LogIn', () => {
  it('should create an instance', inject([LogInService, AuthService, Router], (logInService, authService, router) => {
    const component = new LogInComponent(logInService, authService, router);
    expect(component).toBeTruthy();
  }));
});
