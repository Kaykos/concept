import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {PropsMapping} from './model.service';

import {Suscripcion} from '../models/suscripcion.model';

@Injectable()
export class SuscripcionesService{
  static propsMapping: PropsMapping = {
    id: 'id',
    numeroParticipaciones: 'numero_participaciones',
    numeroSorteos: 'numero_sorteos',
    numeroSorteosJugados: 'numero_sorteos_jugados',
    fechaHora: 'fecha_hora',
    estado: 'estado'
  };

  constructor(private http: Http){}

  search(usuarioId: number, params?: URLSearchParams): Observable<Suscripcion[]>{
    let options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'}),
      search: params
    });
    return this.http.get(`http://localhost:8080/usuarios/${usuarioId}/suscripciones`, options)
      .map((response: Response) => SuscripcionesService.fromResponse(response));
  }

  private static fromResponse(response: Response): Suscripcion[]{
    let propsMapping: PropsMapping = SuscripcionesService.propsMapping;

    let list: Suscripcion[] = [];
    for(let data of response.json()){
      let model = new Suscripcion();
      for(let prop in propsMapping){
        model[prop] = data[propsMapping[prop]];
      }
      list.push(model);
    }
    return list;
  }
}
