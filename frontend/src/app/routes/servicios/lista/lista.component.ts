import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription, Subject} from 'rxjs';

import {ModalComponent} from 'ng2-bs3-modal/components/modal';

import {Logger} from '../../../shared/services/logger.service';

import {Servicio} from '../../../shared/models/servicio.model';

@Component({
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, OnDestroy{
  @ViewChild('modal') modal: ModalComponent;
  isModalShown: boolean = false;

  private querySub: Subscription;

  listaServicios: {
    subject: Subject<URLSearchParams>,
    term: string,
    params: URLSearchParams,
    selected?: Servicio
  };

  listaSorteos: {
    subject: Subject<URLSearchParams>,
    params: URLSearchParams
  };

  constructor(private route: ActivatedRoute,
              private logger: Logger){
    this.listaServicios = {
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

  updateSuscripcionesParams(params: URLSearchParams){
    this.listaServicios.params = params;
  }

  isDisabled(term: string){
    return term == this.listaServicios.params.get('term');
  }

  showSorteos(suscripcion: Servicio){
    this.listaServicios.selected = suscripcion;
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
