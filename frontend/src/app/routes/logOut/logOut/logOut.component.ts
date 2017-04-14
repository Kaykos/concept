import {Component, OnInit} from '@angular/core';

import {SettingsService} from '../../../core/settings/settings.service';

import {User} from '../../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logOut',
    templateUrl: './logOut.component.html',
    styleUrls: ['./logOut.component.scss']
})
export class LogOutComponent implements OnInit {
  private user: User;

  constructor(private router: Router, private settingsService: SettingsService) {
  }

  ngOnInit() {
      this.user = {
        id: 0,
        name: 'Guest',
        lastName: ' ',
        email: ' ',
        username: 'guest',
        role: 'guest'
      };
      this.settingsService.setUser(this.user);
      this.settingsService.setIsLogged(false);
      this.router.navigate(['/logIn']);
  }
}
