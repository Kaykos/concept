import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription} from 'rxjs';

import {Service} from '../../../shared/models/service.model';
import {AuthService} from 'app/shared/services/auth.service';

import {User} from '../../../shared/models/user.model';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private user: User;
  private subscription: any;
  private querySub: Subscription;

  servicesList: {
    urlParams?: URLSearchParams,
    selected?: Service
  };

  constructor(private route: ActivatedRoute,
              private authService: AuthService) {
    this.servicesList = {};
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
    this.querySub = this.route.queryParams
      .subscribe((params: Params) => {
        let urlParams: URLSearchParams = new URLSearchParams();
        if(params['term']){
          urlParams.set('term', params['term']);
        }
        this.servicesList.urlParams = urlParams;
      });
      this.subscription = this.authService.getUserSubject().subscribe((user: User) => { this.updateUser(user); } );
  }

  ngOnDestroy() {
    this.querySub = null;
    this.servicesList = null;
    this.subscription.unsubscribe();
  }

  /*
   Update user information
   If there is no user logged, set guest information

   */
  updateUser(user: User) {
    this.user = user;
    if (this.user == null) {
      this.user = {
        id: 0,
        name: 'Guest',
        lastName: ' ',
        email: ' ',
        username: 'guest',
        role: 'guest'
      };
    }
  }
}
