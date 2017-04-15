/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {Router} from '@angular/router';

import { RegisterComponent } from './register.component';
import {RegisterService} from '../../../shared/services/register.service';
import {AuthService} from '../../../shared/services/auth.service';

describe('Component: Register', () => {
  it('should create an instance', inject([RegisterService, AuthService, Router], (registerService, authService, router) => {
    const component = new RegisterComponent(registerService, authService, router);
    expect(component).toBeTruthy();
  }));
});
