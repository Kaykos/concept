import {Component, OnChanges, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Observable, Subject, BehaviorSubject} from 'rxjs';

import {Logger} from '../../../../shared/services/logger.service';
import {ServicesService} from '../../../../shared/services/services.service';

import {Service} from '../../../../shared/models/service.model';

@Component({
  selector: 'grid-services',
  templateUrl: './grid-services.component.html'
})
export class GridServicesComponent implements OnChanges, OnInit, OnDestroy{
  @Input() urlParams: URLSearchParams;
  @Output() editClick: EventEmitter<Service>;
  @Output() deleteClick: EventEmitter<Service>;

  services: Service[];
  subject: BehaviorSubject<URLSearchParams>;
  loading: boolean;
  error: boolean;

  constructor(private servicesService: ServicesService,
              private logger: Logger) {
    this.editClick = new EventEmitter<Service>();
    this.deleteClick = new EventEmitter<Service>();

    this.subject = new BehaviorSubject<URLSearchParams>(new URLSearchParams());
    this.loading = true;
    this.error = false;
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['urlParams']){
      this.logger.info('lista-suscripciones ngOnChanges entro');
      this.subject.next(changes['urlParams'].currentValue);
    }else{
      this.logger.info('lista-suscripciones ngOnChanges NO entro');
    }
  }

  ngOnInit() {
    this.subject
      .distinctUntilChanged((before: URLSearchParams, now: URLSearchParams) => {  // ignore if next search term is same as previous
        let equal: boolean = before.get('term') == now.get('term');
        if(!equal){
          this.error = false;
        }
        this.loading = !equal;
        return equal;
      })
      .switchMap((params: URLSearchParams) => {
        return this.servicesService.search(params)
          .catch(error => {
            this.logger.error('Error:', error);
            this.error = true;
            this.loading = false;
            return Observable.of<Service[]>([]);
          });
      })
      .do((services: Service[]) => {
        this.loading = false;
      })
      .subscribe((services: Service[]) => {
        this.services = services;
      });
  }

  ngOnDestroy() {
    this.editClick = null;
    this.deleteClick = null;
    this.services = null;
    this.subject = null;
  }
}
