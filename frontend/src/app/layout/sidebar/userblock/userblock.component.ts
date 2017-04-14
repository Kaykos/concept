import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    constructor(private userblockService: UserblockService) {
        this.initDefault();
    }

    ngOnInit() {
    }

    initDefault() {
      this.user = {
        picture: 'assets/img/user/guest.jpg',
        name: 'Guest',
        role: 'Guest',
        logged: false
      };
    }

    setUser(name: string, role: string, looged: boolean, image: string) {
      this.user = {
        picture: 'assets/img/user/' + image + '.jpg',
        name: name,
        role: role,
        logged: true
      };
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }
}
