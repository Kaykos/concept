/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {Router} from '@angular/router';

import { ServiceComponent } from './service.component';
import {ServicesService} from '../../../shared/services/services.service';
import {AuthService} from '../../../shared/services/auth.service';

describe('Component: Service', () => {
  it('should create an instance', () => {
    const component = new ServiceComponent();
    expect(component).toBeTruthy();
  });
});
