import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription} from 'rxjs';

import {Logger} from '../../../shared/services/logger.service';

import {Service} from '../../../shared/models/service.model';
import {AuthService} from 'app/shared/services/auth.service';

import {User} from '../../../shared/models/user.model';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private user: User;
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
    this.authService.getUserSubject().subscribe((user: User) => { this.updateUser(user); } );
    this.querySub = this.route.queryParams
      .subscribe((params: Params) => {
        let urlParams: URLSearchParams = new URLSearchParams();
        if(params['term']){
          urlParams.set('term', params['term']);
        }
        this.servicesList.urlParams = urlParams;
      });
  }

  ngOnDestroy() {
    this.querySub = null;
    this.servicesList = null;
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
