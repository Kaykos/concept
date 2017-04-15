import {Component} from '@angular/core';
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
export class ListComponent {
  private user: User;
  private querySub: Subscription;

  servicesList: {
    urlParams?: URLSearchParams,
    selected?: Service
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private logger: Logger,
              private authService: AuthService) {
    this.servicesList = {};
    this.user = null;
  }

  ngOnInit() {
    this.authService.getUserSubject().subscribe((user: User) => { this.user = user; } );
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

  search(params: {[key: string]: string}) {
    // Actualiza los parametros de la url
    const extras = {
      relativeTo: this.route,
      queryParams: params
    };
    this.router.navigate(['.'], extras);
  }

  showForm(service: Service) {
    this.logger.info('showForm', service);
  }

  deleteConfirmation(service: Service) {
    this.logger.info('deleteConfirmation', service);
  }
}
