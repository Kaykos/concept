import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription, Subject} from 'rxjs';

import {Logger} from '../../../shared/services/logger.service';

import {Service} from '../../../shared/models/service.model';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent{
  private querySub: Subscription;

  listaServicios: {
    subject: Subject<URLSearchParams>,
    term: string,
    params: URLSearchParams,
    selected?: Service
  };

  constructor(private route: ActivatedRoute,
              private logger: Logger){
    this.listaServicios = {
      subject: new Subject<URLSearchParams>(),
      params: new URLSearchParams(),
      term: ''
    };
  }

  ngOnInit(){
    this.querySub = this.route.queryParams
      .debounceTime(100)
      .subscribe((urlParams: Params) => {
        this.logger.info('url params', urlParams);

        let params: URLSearchParams = this.listaServicios.params.clone();
        params.set('term', '');
        this.listaServicios.subject.next(params);
      });
  }

  ngOnDestroy(){
    this.querySub = null;
    this.listaServicios = null;
  }

  search(term: string){
    let params: URLSearchParams = this.listaServicios.params.clone();
    params.set('term', term);
    this.listaServicios.subject.next(params);
  }

  updateServicesParams(params: URLSearchParams){
    this.listaServicios.params = params;
  }

  isDisabled(term: string){
    return term == this.listaServicios.params.get('term');
  }
}
