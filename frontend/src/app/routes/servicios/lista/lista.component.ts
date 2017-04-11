import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription, Subject} from 'rxjs';

import {ModalComponent} from 'ng2-bs3-modal/components/modal';

import {Logger} from '../../../shared/services';

import {Suscripcion} from '../../../shared/models/suscripcion.model';

@Component({
  templateUrl: './extended.component.html',
  styleUrls: ['./extended.component.scss']
})
export class ExtendedComponent implements OnInit, OnDestroy{
  @ViewChild('modal') modal: ModalComponent;
  isModalShown: boolean = false;

  private querySub: Subscription;

  listaSuscripciones: {
    subject: Subject<URLSearchParams>,
    term: string,
    params: URLSearchParams,
    selected?: Suscripcion
  };

  listaSorteos: {
    subject: Subject<URLSearchParams>,
    params: URLSearchParams
  };

  constructor(private route: ActivatedRoute,
              private logger: Logger){
    this.listaSuscripciones = {
      subject: new Subject<URLSearchParams>(),
      params: new URLSearchParams(),
      term: ''
    }

    this.listaSorteos = {
      subject: new Subject<URLSearchParams>(),
      params: new URLSearchParams()
    };
  }

  ngOnInit(){
    this.querySub = this.route.queryParams
      .debounceTime(100)
      .subscribe((urlParams: Params) => {
        this.logger.info('url params', urlParams);

        let params: URLSearchParams = this.listaSuscripciones.params.clone();
        params.set('term', '');
        this.listaSuscripciones.subject.next(params);
      });
  }

  ngOnDestroy(){
    this.querySub = null;
    this.listaSuscripciones = null;
  }

  search(term: string){
    let params: URLSearchParams = this.listaSuscripciones.params.clone();
    params.set('term', term);
    this.listaSuscripciones.subject.next(params);
  }

  updateSuscripcionesParams(params: URLSearchParams){
    this.listaSuscripciones.params = params;
  }

  isDisabled(term: string){
    return term == this.listaSuscripciones.params.get('term');
  }

  showSorteos(suscripcion: Suscripcion){
    this.listaSuscripciones.selected = suscripcion;
    this.isModalShown = true;
    this.modal.open();
  }

  updateSorteosParams(params: URLSearchParams){
    this.listaSorteos.params = params;
  }

  hideModal(){
    this.modal.close();
  }

  onOpen(){
    this.logger.info('onOpen');
    setTimeout(() => {
      this.listaSorteos.subject.next(this.listaSorteos.params);
    }, 500);
  }

  onClose(){
    this.logger.info('onClose');
    this.isModalShown = false;
  }

  onDismiss(){
    this.logger.info('onDismiss');
    this.isModalShown = false;
  }
}
