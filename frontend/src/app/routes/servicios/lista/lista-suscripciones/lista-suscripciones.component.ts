import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Observable, Subject} from 'rxjs';

import {Logger} from '../../../../shared/services';
import {SuscripcionesService} from '../../../../shared/services/suscripciones.service';

import {Suscripcion} from '../../../../shared/models/suscripcion.model';

@Component({
  selector: 'lista-suscripciones',
  templateUrl: './lista-suscripciones.component.html'
})
export class ListaSuscripcionesComponent implements OnInit, OnDestroy{
  @Input() subject: Subject<URLSearchParams>;
  @Output() beforeQuery: EventEmitter<URLSearchParams>;
  @Output() showSorteosClick: EventEmitter<Suscripcion>;

  suscripciones: Observable<Suscripcion[]>;
  error: boolean;
  loading: boolean;

  constructor(private suscripcionesService: SuscripcionesService,
              private logger: Logger){
    this.beforeQuery = new EventEmitter<URLSearchParams>();
    this.showSorteosClick = new EventEmitter<Suscripcion>();

    this.error = false;
    this.loading = false;
  }

  ngOnInit(){
    let usuarioId: number = 5629499534213120;

    this.suscripciones = this.subject
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
        // return the http search observable or the observable of empty records if there was no search term
        //return term ? this.suscripcionesService.search(usuarioId) : Observable.of<Suscripcion[]>([]);
        this.beforeQuery.emit(params);
        return this.suscripcionesService.search(usuarioId, params)
          .catch(error => {
            this.logger.error('Error:', error);
            this.error = true;
            this.loading = false;
            return Observable.of<Suscripcion[]>([]);
          });
      })
      .do((suscripciones: Suscripcion[]) => {
        this.loading = false;

        // @TODO: borrar
        if(usuarioId == 5629499534213120){
          usuarioId = 999;
        }else{
          usuarioId = 5629499534213120;
        }
      })
      .share();
  }

  ngOnDestroy(){
    this.beforeQuery = null;
    this.showSorteosClick = null;
    this.suscripciones = null;
  }
}
