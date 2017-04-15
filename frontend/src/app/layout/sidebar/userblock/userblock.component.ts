import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import {User} from 'app/shared/models/user.model';
import {SettingsService} from '../../../core/settings/settings.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: User;
    constructor(private userblockService: UserblockService, private settingsService: SettingsService) {
        this.user = new User();

        this.user = {
          id: 0,
          name: 'Guest',
          lastName: ' ',
          email: ' ',
          username: 'guest',
          role: 'guest'
        };
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe((user: User) => { this.user = user; } );
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }
}
