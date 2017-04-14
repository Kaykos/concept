import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription} from 'rxjs';

import {Logger} from '../../../shared/services/logger.service';

import {Service} from '../../../shared/models/service.model';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  private querySub: Subscription;

  servicesList: {
    urlParams?: URLSearchParams,
    selected?: Service
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private logger: Logger) {
    this.servicesList = {};
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
