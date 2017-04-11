import {Component, OnChanges, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Observable, Subject} from 'rxjs';

import {Logger} from '../../../../shared/services';
import {SorteosService} from '../../../../shared/services';

import {Suscripcion} from '../../../../shared/models/suscripcion.model';
import {Sorteo} from '../../../../shared/models/sorteo.model';

@Component({
  selector: 'lista-sorteos',
  templateUrl: './lista-sorteos.component.html'
})
export class ListaSorteosComponent implements OnChanges, OnInit, OnDestroy{
  @Input() suscripcion: Suscripcion;
  @Input() subject: Subject<URLSearchParams>;
  @Output() beforeQuery: EventEmitter<URLSearchParams>;

  sorteos: Observable<Sorteo[]>;
  error: boolean;
  loading: boolean;

  constructor(private sorteosService: SorteosService,
              private logger: Logger){
    this.logger.info('ListaSorteosComponent constructor');

    this.beforeQuery = new EventEmitter<URLSearchParams>();

    this.error = false;
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges){
    this.logger.info('ListaSorteosComponent ngOnChange', changes);
  }

  ngOnInit(){
    this.logger.info('ListaSorteosComponent ngOnInit');

    let usuarioId: number = 5629499534213120;

    this.sorteos = this.subject
      /**
       * Si se dejara el "debounceTime" seria mejor hacer primero el "do" y dejar en el "distinctUntilChanged":
       * if(equal){
       *   this.loading = false;
       * }
       */
      //.do((params: URLSearchParams) => this.loading = true)
      //.debounceTime(3000)  // wait 300ms after each keystroke before considering the term
      //.distinctUntilChanged((before: URLSearchParams, now: URLSearchParams) => {  // ignore if next search term is same as previous
      //  let equal: boolean = before.get('term') == now.get('term');
      //  //if(equal){
      //  //  this.loading = false;
      //  //}
      //  if(!equal){
      //    this.error = false;
      //  }
      //  this.loading = !equal;
      //  return equal;
      //})
      .switchMap((params: URLSearchParams) => {  // switch to new observable each time the term changes
        this.beforeQuery.emit(params);
        return this.sorteosService.search(usuarioId, this.suscripcion.id, params)
          .catch(error => {
            this.logger.error('Error:', error);
            this.error = true;
            this.loading = false;
            return Observable.of<Sorteo[]>([]);
          });
      })
      .do((sorteos: Sorteo[]) => {
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
    this.sorteos = null;
    this.subject = null;
  }
}
