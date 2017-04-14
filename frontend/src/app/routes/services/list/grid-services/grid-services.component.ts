import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Observable, Subject} from 'rxjs';

import {Logger} from '../../../../shared/services/logger.service';
import {ServicesService} from '../../../../shared/services/services.service';

import {Service} from '../../../../shared/models/service.model';

@Component({
  selector: 'grid-services',
  templateUrl: './grid-services.component.html'
})
export class GridServicesComponent implements OnInit, OnDestroy{
  @Input() subject: Subject<URLSearchParams>;
  @Output() beforeQuery: EventEmitter<URLSearchParams>;
  @Output() editClick: EventEmitter<Service>;
  @Output() deleteClick: EventEmitter<Service>;

  services: Observable<Service[]>;
  error: boolean;
  loading: boolean;

  constructor(private servicesService: ServicesService,
              private logger: Logger) {
    this.beforeQuery = new EventEmitter<URLSearchParams>();
    this.editClick = new EventEmitter<Service>();
    this.deleteClick = new EventEmitter<Service>();

    this.error = false;
    this.loading = true;
  }

  ngOnInit() {
    this.services = this.subject
      /**
       * Si se dejara el "debounceTime" seria mejor hacer primero el "do" y dejar en el "distinctUntilChanged":
       * if(equal){
       *   this.loading = false;
       * }
       */
      //.do((params: URLSearchParams) => this.loading = true)
      //.debounceTime(3000)  // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged((before: URLSearchParams, now: URLSearchParams) => {  // ignore if next search term is same as previous
        let equal: boolean = before.get('term') == now.get('term');
        //if(equal){
        //  this.loading = false;
        //}
        if(!equal){
          this.error = false;
        }
        this.loading = !equal;
        return equal;
      })
      .switchMap((params: URLSearchParams) => {  // switch to new observable each time the term changes
        this.beforeQuery.emit(params);
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
      .share();
  }

  ngOnDestroy() {
    this.beforeQuery = null;
    this.editClick = null;
    this.deleteClick = null;
    this.services = null;
  }
}
