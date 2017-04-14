import {Injectable, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {Subject} from '@angular/core/src/facade/async';
import {Observable} from 'rxjs/Observable';

declare var $: any;

@Injectable()
export class SettingsService implements OnInit{

    private user: User;
    private subject: Subject<User> = new Subject<User>();
    private app: any;
    public layout: any;

    constructor() {

        this.user = new User();

        // User Settings
        // -----------------------------------
        this.user = {
            id: 0,
            name: 'Guest',
            lastName: ' ',
            email: ' ',
            username: 'guest',
            role: 'guest'
        };

        // App Settings
        // -----------------------------------
        this.app = {
            name: 'Concept',
            company: 'SCAMS',
            description: 'Events Platform',
            year: ((new Date()).getFullYear())
        };

        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: null,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

    }

    ngOnInit() {
      this.subject.next(this.user);
    }

    getAppSetting(name) {
        return name ? this.app[name] : this.app;
    }
    getUserSetting(name) {
        return name ? this.user[name] : this.user;
    }
    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }

    setAppSetting(name, value) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }
    setUserSetting(name, value) {
        if (typeof this.user[name] !== 'undefined') {
            this.user[name] = value;
        }
    }
    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }

    getUser(): Observable<User> {
        return this.subject.asObservable();
    }

    setUser(user: User): void {
        this.user = user;
        this.subject.next(user);
    }

    toggleLayoutSetting(name) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

}
