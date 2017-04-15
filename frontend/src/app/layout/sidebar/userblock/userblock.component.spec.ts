/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { UserblockComponent } from './userblock.component';
import { UserblockService } from './userblock.service';
import {AuthService} from "../../../shared/services/auth.service";

describe('Component: Userblock', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserblockService]
        }).compileComponents();
    });

    it('should create an instance', async(inject([UserblockService, AuthService], (userBlockService, authService) => {
        const component = new UserblockComponent(userBlockService, authService);
        expect(component).toBeTruthy();
    })));
});
